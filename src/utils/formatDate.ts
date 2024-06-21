export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const formattedDate = date.toLocaleString('en-US', options);

  // Further customize the string to match "June 6 of 2024, 7:41 pm"
  const [datePart, timePart] = formattedDate.split(', ');
  const [monthDay, year] = datePart.split(' ');

  return `${monthDay} of ${year}, ${timePart}`;
}