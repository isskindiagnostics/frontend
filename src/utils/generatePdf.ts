import { JobData } from "@/types/job";
import { User } from "@/types/user";

export default async function generatePdf(userData: User, jobData: JobData) {
  const res = await fetch("/api/pdf", {
    method: "POST",
    body: JSON.stringify({ userData, jobData }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to generate PDF");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank");
}
