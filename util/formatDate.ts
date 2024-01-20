export default function formatDate(date: string | Date): string | Date {
  function toDate(): Date {
    date = date as string;

    if (!date.includes("/")) {
      return new Date(`${date} 00:00:00`);
    }

    const [day, month, year] = date.split("/");
    return new Date(+year, +month - 1, +day);
  }

  function toString(): string {
    return (date as Date).toLocaleDateString("pt-BR");
  }

  if (date instanceof Date) {
    return toString();
  }
  return toDate();
}
