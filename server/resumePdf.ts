import { readFileSync } from "node:fs";
import { join } from "node:path";
import PDFDocument from "pdfkit";
import { getResumeIcon } from "../utils/resumeIcons";
import resume from "../content/resume.json";
import contacts from "../content/contacts.json";
import skills from "../content/skills.json";
import { contactLabel, RESUME_PAGE_BREAK_AFTER, resumeLanguages } from "../utils/resume";

// Local, embedded fonts keep exports independent of network access and preserve text.
const fonts = {
  body: readFileSync(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
  bold: readFileSync(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff")),
  display: readFileSync(join(process.cwd(), "node_modules/@fontsource/josefin-sans/files/josefin-sans-latin-300-normal.woff")),
};

export type ResumeVariant = "resume" | "full";

const MARGIN = 40;
const SIDEBAR_WIDTH = 158;
const GAP = 30;
const INK = "#1a1a1a";
const MUTED = "#686868";
const RULE = "#c9c9c9";

function drawResume(doc: PDFKit.PDFDocument, variant: ResumeVariant) {
  const width = doc.page.width - MARGIN * 2;
  const mainX = MARGIN + SIDEBAR_WIDTH + GAP;
  const mainWidth = width - SIDEBAR_WIDTH - GAP;
  const bottom = doc.page.height - MARGIN;
  let sidebarBottom = 0;
  let y = 0;

  function text(value: string, x: number, top: number, textWidth: number, options: {
    font?: keyof typeof fonts;
    size?: number;
    color?: string;
    align?: PDFKit.Mixins.TextOptions["align"];
    characterSpacing?: number;
    link?: string;
  } = {}) {
    doc.font(options.font ?? "body").fontSize(options.size ?? 9).fillColor(options.color ?? INK);
    doc.text(value, x, top, {
      width: textWidth,
      lineGap: 2,
      ...options,
    });
    return doc.y;
  }

  function icon(name: string, x: number, top: number, size: number, color = INK) {
    const definition = getResumeIcon(name);
    doc.save().translate(x, top).scale(size / 24).path(definition.path);
    if (definition.paint === "fill") {
      doc.fill(color);
    } else {
      doc.lineWidth(1.5).stroke(color);
    }
    doc.restore();
  }

  function line(x: number, top: number, lineWidth: number) {
    doc.strokeColor(RULE).lineWidth(0.5).moveTo(x, top).lineTo(x + lineWidth, top).stroke();
  }

  function heading(value: string, x: number, top: number, headingWidth: number) {
    return text(value.toUpperCase(), x, top, headingWidth, {
      font: "display", size: 12, characterSpacing: 1.5,
    }) + 10;
  }

  function header() {
    text("DMITRIY KOVALENKO", MARGIN, 36, width, {
      font: "display", size: 24, characterSpacing: 4, align: "center",
    });
    line(MARGIN, 76, width);
    text(resume.employment[0].position.toUpperCase(), MARGIN, 85, width, {
      font: "display", size: 11, characterSpacing: 2.4, align: "center",
    });
    line(MARGIN, 107, width);
    return 127;
  }

  function nextPage() {
    doc.addPage();
    y = header();
    sidebarBottom = y;
  }

  function measure(value: string, textWidth: number, size = 9, font: keyof typeof fonts = "body") {
    return doc.font(font).fontSize(size).heightOfString(value, { width: textWidth, lineGap: 2 });
  }

  function ensureSpace(height: number) {
    if (y + height > bottom) {
      nextPage();
      y = heading("Work Experience (continued)", mainX, y, mainWidth);
    }
  }

  y = header();
  let sideY = heading("Contact", MARGIN, y, SIDEBAR_WIDTH);
  const allContacts = [...contacts, { name: "Website", url: "https://dmtrkovalenko.dev" }];
  for (const contact of allContacts) {
    icon(contact.name, MARGIN, sideY + 0.5, 10);
    doc.link(MARGIN, sideY, 10, 11, contact.url);
    sideY = text(contactLabel(contact), MARGIN + 16, sideY, SIDEBAR_WIDTH - 16, {
      size: 8, link: contact.url,
    }) + 5;
  }
  line(MARGIN, sideY + 3, SIDEBAR_WIDTH);
  sideY = heading("Skills", MARGIN, sideY + 18, SIDEBAR_WIDTH);
  for (const [area, values] of Object.entries(skills)) {
    sideY = text(area.toUpperCase(), MARGIN, sideY, SIDEBAR_WIDTH, { font: "bold", size: 8 }) + 3;
    sideY = text(values.join(", "), MARGIN, sideY, SIDEBAR_WIDTH, { size: 8, color: MUTED }) + 10;
  }
  line(MARGIN, sideY + 3, SIDEBAR_WIDTH);
  sideY = heading("Languages", MARGIN, sideY + 18, SIDEBAR_WIDTH);
  for (const language of resumeLanguages) {
    sideY = text(`${language.name}  ${language.level}`, MARGIN, sideY, SIDEBAR_WIDTH, { size: 8 }) + 5;
  }
  sidebarBottom = sideY;
  doc.strokeColor(RULE).lineWidth(0.5).moveTo(mainX - GAP / 2, y).lineTo(mainX - GAP / 2, sideY).stroke();

  y = heading("Profile", mainX, y, mainWidth);
  for (const paragraph of resume.summary.split("\n\n")) {
    y = text(paragraph, mainX, y, mainWidth) + 9;
  }
  line(mainX, y + 3, mainWidth);
  y = heading("Work Experience", mainX, y + 18, mainWidth);

  const jobs = resume.employment.filter(job => variant === "full" || !(job as { showOnlyOnCV?: boolean }).showOnlyOnCV);
  for (const [index, job] of jobs.entries()) {
    if (index === RESUME_PAGE_BREAK_AFTER) {
      nextPage();
      sideY = heading("Education", MARGIN, y, SIDEBAR_WIDTH);
      for (const education of resume.education) {
        sideY = text(education.position.toUpperCase(), MARGIN, sideY, SIDEBAR_WIDTH, { font: "bold", size: 9 }) + 6;
        sideY = text(education.place, MARGIN, sideY, SIDEBAR_WIDTH, { size: 8 }) + 6;
        sideY = text(education.when, MARGIN, sideY, SIDEBAR_WIDTH, { size: 8, color: MUTED }) + 12;
      }
      sidebarBottom = sideY;
      y = heading("Work Experience (continued)", mainX, y, mainWidth);
    }
    const positionWidth = mainWidth * 0.55;
    const dateWidth = mainWidth - positionWidth - 8;
    const titleHeight = Math.max(
      measure(job.position.toUpperCase(), positionWidth, 9, "bold"),
      measure(job.when, dateWidth, 7.5),
    );
    ensureSpace(titleHeight + measure(job.company, mainWidth, 9, "bold") + measure(job.responsibilities, mainWidth) + 24);
    const titleEnd = text(job.position.toUpperCase(), mainX, y, positionWidth, { font: "bold", size: 9 });
    const dateEnd = text(job.when, mainX + positionWidth + 8, y, dateWidth, { size: 7.5, color: MUTED, align: "right" });
    y = Math.max(titleEnd, dateEnd) + 4;
    y = text(job.company, mainX, y, mainWidth, { font: "bold", size: 9 }) + 5;
    y = text(job.responsibilities, mainX, y, mainWidth) + 10;

    if (variant === "full" && job.projects) {
      for (const project of job.projects) {
        const details = `${project.idea}. ${project.responsibilities}`;
        const stack = project.stack?.join(" · ") ?? "";
        ensureSpace(measure(details, mainWidth - 12, 8) + measure(stack, mainWidth - 12, 7.5) + 16);
        y = text(details, mainX + 12, y, mainWidth - 12, { size: 8 }) + 4;
        y = text(stack, mainX + 12, y, mainWidth - 12, { size: 7.5, color: MUTED }) + 12;
      }
    }
  }

  y = Math.max(y, sidebarBottom) + 12;
  if (y + 150 > bottom) nextPage();
  line(MARGIN, y, width);
  y = heading("Notable Open Source Work", MARGIN, y + 16, width);
  const cardWidth = (width - 18) / 2;
  for (let index = 0; index < resume.ossProjects.length; index += 2) {
    const projects = resume.ossProjects.slice(index, index + 2);
    const heights = projects.map(project =>
      measure(project.description, cardWidth - 20, 8) + measure(project.tech.join(" · "), cardWidth - 20, 7) +
      measure(project.url.replace(/^https?:\/\//, ""), cardWidth - 20, 7) + 66,
    );
    const rowHeight = Math.max(...heights);
    if (y + rowHeight > bottom) {
      nextPage();
      y = heading("Open Source Work (continued)", MARGIN, y, width);
    }
    for (const [column, project] of projects.entries()) {
      const x = MARGIN + column * (cardWidth + 18);
      doc.strokeColor(RULE).lineWidth(0.5).rect(x, y, cardWidth, rowHeight).stroke();
      let cardY = text(project.name.toUpperCase(), x + 10, y + 10, cardWidth - 20, { font: "bold", size: 10 }) + 4;
      const roleEnd = text(project.role, x + 10, cardY, cardWidth - 20, { size: 7.5, color: MUTED });
      const starsWidth = doc.widthOfString(project.stars);
      const starsX = x + cardWidth - 10 - starsWidth;
      icon("Star", starsX - 11, cardY + 1, 8, MUTED);
      text(project.stars, starsX, cardY, starsWidth + 1, { size: 7.5, color: MUTED });
      cardY = roleEnd + 7;
      cardY = text(project.description, x + 10, cardY, cardWidth - 20, { size: 8 }) + 7;
      cardY = text(project.tech.join(" · "), x + 10, cardY, cardWidth - 20, { size: 7, font: "bold" }) + 4;
      text(project.url.replace(/^https?:\/\//, ""), x + 10, cardY, cardWidth - 20, { size: 7, link: project.url });
    }
    y += rowHeight + 8;
  }
}

export function renderResumePdf(variant: ResumeVariant): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4", margin: MARGIN,
      info: { Title: "Dmitriy Kovalenko | Resume", Author: "Dmitriy Kovalenko" },
    });
    for (const [name, font] of Object.entries(fonts)) doc.registerFont(name, font);
    const chunks: Buffer[] = [];
    doc.on("data", chunk => chunks.push(chunk));
    doc.on("error", reject);
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    drawResume(doc, variant);
    doc.end();
  });
}
