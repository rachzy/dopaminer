/**
 * This function formats a date string or Date object into a specific format.
 * If the input is a string, it converts it to a Date object.
 * If the input is a Date object, it converts it to a string in the "pt-BR" locale.
 * 
 * @param {string | Date} date - The date to be formatted.
 * @returns {string | Date} - The formatted date.
 */
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
