import * as playwright from "playwright-aws-lambda";
import type { NextApiResponse, NextApiRequest } from "next";

async function getResult(url: string) {
  const browser = await playwright.launchChromium();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const result = await page.pdf({ format: "A4" });
  await browser.close();

  return result;
}

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const urlToBeAudited =
    "https://dmtrkovalenko-git-feature-next-framer-update.rest-or-run.vercel.app/resume";

  return getResult(urlToBeAudited)
    .then((pdf) => {
      console.log("GENERATED");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", pdf.length);

      res.send(pdf);
    })
    .catch((e) => {
      console.log(e);
      res.status(500);
      res.end("Can not generate pdf");
    });
};
