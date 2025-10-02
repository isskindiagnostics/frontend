export const runtime = "nodejs";
import { NextRequest } from "next/server";

import { JobData } from "@/types/job";
import { User } from "@/types/user";
import { formatDate } from "@/utils/date";
import { getSkinTypeLabel } from "@/utils/labels";

type RequestBody = {
  user: User;
  jobData: JobData;
};

export async function POST(req: NextRequest) {
  try {
    const [
      { default: handlebars },
      { default: puppeteer },
      { default: htmlTemplate },
    ] = await Promise.all([
      import("handlebars"),
      import("puppeteer"),
      import("@/templates/report.html?raw"),
    ]);

    const template = handlebars.compile(htmlTemplate);
    const { user, jobData }: RequestBody = await req.json();

    const formattedData = {
      doctorName: user.userData.name || "",
      doctorPhoneNumber: user.userData.phoneNumber || "",
      doctorPLCouncil: user.professionalInfo.register?.council || "",
      doctorPLState: user.professionalInfo.register?.state || "",
      doctorPLNumber: user.professionalInfo.register?.number || "",

      patientName: jobData.patientData?.name || "",
      patientGender: jobData.patientData?.gender || "",
      patientBirthDate: jobData.patientData?.birthDate
        ? formatDate(jobData.patientData.birthDate)
        : "",
      patientInsurance: jobData.patientData?.insurance || "",
      patientSkinLocation: jobData.patientData?.skinLocation || "",
      patientSkinType: jobData.patientData?.skinType
        ? getSkinTypeLabel(jobData.patientData.skinType)
        : "",

      completedAt: jobData.completedAt ? formatDate(jobData.completedAt) : "",
      comment: jobData.comment || "",
      protocol: jobData.protocol || "",

      benign: jobData.result?.binary_prediction?.benign || "",
      malignant: jobData.result?.binary_prediction?.malignant || "",
      dx_prediction: jobData.result?.dx_prediction || "",
    };

    const html = template(formattedData);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html);
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
