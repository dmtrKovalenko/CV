import * as playwright from "playwright-aws-lambda";
import type { NextApiResponse, NextApiRequest } from "next";

const getResumeUrl = () => {
  const baseURL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:4000";

  return baseURL + "/resume";
};

async function getResult() {
  const browser = await playwright.launchChromium();
  const page = await browser.newPage();
  await page.goto(getResumeUrl(), { waitUntil: "networkidle" });
  const result = await page.pdf({ format: "A4" });
  await browser.close();

  return result;
}

export default (_req: NextApiRequest, res: NextApiResponse) => {
  return getResult()
    .then((pdf) => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", pdf.length);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Dmitriy_Kovalenko.pdf"
      );
      res.send(pdf);
    })
    .catch((e) => {
      console.error(e);
      
      res.status(500);
      res.end("Can not generate pdf");
    });
};
