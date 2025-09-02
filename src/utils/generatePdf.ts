import { JobData } from "@/types/job";
import { User } from "@/types/user";

export default async function generatePdf(userData: User, jobData: JobData) {
  try {
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        jobData: jobData,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || "Failed to generate PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${jobData.patientData?.name || "unknown"}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error in generatePdf:", error);
    throw error;
  }
}
