export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(' ');
}
