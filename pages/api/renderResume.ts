import type { NextApiRequest, NextApiResponse } from "next";
import { renderResumePdf } from "../../server/resumePdf";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const variant = req.query.variant ?? "resume";
  if (variant !== "resume" && variant !== "full") {
    res.status(400).json({ message: "Unknown resume variant" });
    return;
  }

  try {
    const pdf = await renderResumePdf(variant);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", pdf.length);
    res.setHeader("Content-Disposition", 'attachment; filename="Dmitriy_Kovalenko.pdf"');
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400");
    res.send(pdf);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
}
