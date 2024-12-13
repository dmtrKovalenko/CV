import chromium from "@sparticuz/chromium";
import type { NextApiResponse, NextApiRequest } from "next";
import type { PDFOptions } from "puppeteer-core";
import puppeteer from "puppeteer-core";

interface GeneratePDFError extends Error {
  statusCode?: number;
}

type ResumeURLType = {
  development: string;
  production: string;
};

const RESUME_URLS: ResumeURLType = {
  development: "http://localhost:4000/resume",
  production: "",  // Will be set dynamically based on VERCEL_URL
};

const PDF_OPTIONS: PDFOptions = {
  format: "A4",
  printBackground: true,
  margin: {
    top: "20px",
    right: "20px",
    bottom: "20px",
    left: "20px",
  },
  preferCSSPageSize: true,
  timeout: 8000,
};

const getResumeUrl = (): string => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/resume`;
  }
  return RESUME_URLS.development;
};

const createCustomError = (message: string, statusCode: number): GeneratePDFError => {
  const error: GeneratePDFError = new Error(message);
  error.statusCode = statusCode;
  return error;
};

async function generatePDF(): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    
    try {
      await page.setViewport({
        width: 1200,
        height: 1800,
      });

      const response = await page.goto(getResumeUrl(), {
        waitUntil: ["domcontentloaded", "networkidle0"],
        timeout: 8000,
      });

      if (!response) {
        throw createCustomError("Failed to load page: No response", 500);
      }

      if (!response.ok()) {
        throw createCustomError(
          `Failed to load page: ${response.status()} ${response.statusText()}`,
          response.status()
        );
      }

      const pdf = await page.pdf(PDF_OPTIONS);
      return Buffer.from(pdf);
      
    } finally {
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const pdf = await generatePDF();
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", pdf.length);
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Dmitriy_Kovalenko.pdf"
    );
    
    res.send(pdf);
  } catch (error) {
    console.error("PDF generation error:", error);
    
    const statusCode = (error as GeneratePDFError).statusCode || 500;
    const errorMessage = process.env.NODE_ENV === "development" 
      ? (error as Error).message 
      : "Internal server error";

    res.status(statusCode).json({ 
      message: "Failed to generate PDF",
      error: errorMessage,
    });
  }
}

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

