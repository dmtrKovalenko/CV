import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const baseUrl = process.env.RESUME_TEST_BASE_URL ?? "http://localhost:4000";
const resume = JSON.parse(await readFile(new URL("../content/resume.json", import.meta.url)));

function normalize(value) {
  return value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
}

for (const variant of ["resume", "full"]) {
  test(`${variant} export contains copyable content and working PDF links`, async () => {
    const response = await fetch(`${baseUrl}/api/renderResume?variant=${variant}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /application\/pdf/);
    assert.match(response.headers.get("content-disposition"), /attachment;/);
    const bytes = new Uint8Array(await response.arrayBuffer());
    assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), "%PDF-");
    const loadingTask = getDocument({ data: bytes, isEvalSupported: false });
    const pdf = await loadingTask.promise;
    try {
      if (variant === "resume") assert.equal(pdf.numPages, 2, "The standard resume must fit two pages");
      let text = "";
      const links = [];
      for (let index = 1; index <= pdf.numPages; index++) {
        const page = await pdf.getPage(index);
        const content = await page.getTextContent();
        assert.ok(content.items.length > 0, `Page ${index} must not be blank`);
        for (const item of content.items) {
          if (!("str" in item)) continue;
          text += item.str + " ";
          const [xMin, yMin, xMax, yMax] = page.view;
          assert.ok(item.transform[4] >= xMin && item.transform[4] + item.width <= xMax + 1, `Text outside page width: ${item.str}`);
          assert.ok(item.transform[5] >= yMin && item.transform[5] <= yMax, `Text outside page height: ${item.str}`);
        }
        for (const annotation of await page.getAnnotations()) {
          if (annotation.subtype === "Link") links.push(annotation.url);
        }
      }
      const normalizedText = normalize(text);
      for (const paragraph of resume.summary.split("\n\n")) assert.ok(normalizedText.includes(normalize(paragraph)), "Profile text must be extractable");
      for (const job of resume.employment) {
        if (variant === "resume" && job.showOnlyOnCV) continue;
        for (const field of [job.position, job.company, job.when, job.responsibilities]) assert.ok(normalizedText.includes(normalize(field)), `Missing job text: ${field}`);
        if (variant === "full") {
          for (const project of job.projects ?? []) assert.ok(normalizedText.includes(normalize(project.responsibilities)), `Missing project: ${project.idea}`);
        }
      }
      for (const project of resume.ossProjects) {
        assert.ok(normalizedText.includes(normalize(project.description)), `Missing project description: ${project.name}`);
        assert.ok(links.includes(project.url), `Missing clickable link: ${project.url}`);
      }
      for (const education of resume.education) assert.ok(normalizedText.includes(normalize(education.place)), "Missing education");
    } finally {
      await loadingTask.destroy();
    }
  });
}

test("invalid export requests receive explicit client errors", async () => {
  const invalid = await fetch(`${baseUrl}/api/renderResume?variant=unknown`);
  assert.equal(invalid.status, 400);
  const post = await fetch(`${baseUrl}/api/renderResume`, { method: "POST" });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET");
});
