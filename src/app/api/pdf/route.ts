export const runtime = "nodejs";
import { NextRequest } from "next/server";

import { formatDate } from "@/utils/date";
import { getSkinTypeLabel } from "@/utils/labels";

export async function POST(req: NextRequest) {
  const [
    { default: handlebars },
    { default: puppeteer },
    { default: htmlTemplate },
  ] = await Promise.all([
    import("handlebars"),
    import("puppeteer"),
    import("@/templates/report.html?raw"),
  ]);

  const { userData, jobData } = await req.json();

  const template = handlebars.compile(htmlTemplate);

  const formattedData = {
    doctorName: userData.name,
    doctorPhoneNumber: userData.phoneNumber,
    doctorPLCouncil: userData.professionalLicense.council,
    doctorPLState: userData.professionalLicense.state,
    doctorPLNumber: userData.professionalLicense.number,

    patientName: jobData.patientData.name,
    patientGender: jobData.patientData.gender,
    patientBirthDate: new Date(
      jobData.patientData.birthDate.seconds * 1000
    ).toLocaleDateString("pt-BR"),
    patientInsurance: jobData.patientData.insurance,
    patientSkinLocation: jobData.patientData.skinLocation,
    patientSkinType: getSkinTypeLabel(jobData.patientData.skinType),

    completedAt: formatDate(jobData.completedAt),
    comment: jobData.comment,
    protocol: jobData.protocol,

    benign: jobData.result.binary_prediction.benign,
    malignant: jobData.result.binary_prediction.malignant,
    dx_prediction: jobData.result.dx_prediction,
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
}
