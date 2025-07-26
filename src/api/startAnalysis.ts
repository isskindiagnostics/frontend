// lib/api/startAnalysis.ts
export async function startAnalysis(
  image: File,
  userId: string
): Promise<string> {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("userId", userId);

  const res = await fetch("http://localhost:3001/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao iniciar análise");
  }

  const data = await res.json();
  return data.jobId;
}
