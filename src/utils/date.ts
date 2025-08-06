type FormatType = "short" | "long";

export function getAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}

export function formatDate(
  dateString: string,
  format: FormatType = "short"
): string {
  const date = new Date(dateString);

  if (format === "short") {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } else {
    const day = date.toLocaleDateString("pt-BR", { day: "2-digit" });
    const month = date.toLocaleDateString("pt-BR", { month: "long" });
    const year = date.toLocaleDateString("pt-BR", { year: "numeric" });

    return `${day} de ${month} de ${year}`;
  }
}
