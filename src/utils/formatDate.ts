export default function formatDate(timestamp: { seconds: number }): string {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
