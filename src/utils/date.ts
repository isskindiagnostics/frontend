import { Timestamp } from "firebase/firestore";

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
  dateInput: Date | Timestamp | string | number,
  format: FormatType = "short"
): string {
  let date: Date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (dateInput instanceof Timestamp) {
    date = dateInput.toDate();
  } else if (typeof dateInput === "number") {
    const timestamp = dateInput < 10000000000 ? dateInput * 1000 : dateInput;
    date = new Date(timestamp);
  } else if (typeof dateInput === "string") {
    const dateMatch = dateInput.match(/(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/);

    if (dateMatch) {
      const [, day, monthName, year] = dateMatch;

      const monthMap: Record<string, number> = {
        janeiro: 0,
        fevereiro: 1,
        março: 2,
        abril: 3,
        maio: 4,
        junho: 5,
        julho: 6,
        agosto: 7,
        setembro: 8,
        outubro: 9,
        novembro: 10,
        dezembro: 11,
      };

      const monthIndex = monthMap[monthName.toLowerCase()];
      if (monthIndex !== undefined) {
        date = new Date(parseInt(year), monthIndex, parseInt(day));
      } else {
        console.warn("Unknown month name:", monthName);
        return "Invalid date";
      }
    } else {
      date = new Date(dateInput);
    }
  } else {
    return "Invalid date";
  }

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
