export default function formatDate(date: string | Date): string | Date {
  function toDate(): Date {
    date = date as string;

    if (!date.includes("/")) {
      return new Date(`${date} 00:00:00`);
    }

    const [month, day, year] = date.split("/");
    return new Date(`${+year}-${+month}-${+day} 00:00:00`);
  }

  function toString(): string {
    return (date as Date).toLocaleDateString("pt-BR");
  }

  if (date instanceof Date) {
    return toString();
  }
  return toDate();
}
