// Date Formatter for DataTable
export function formatDate(date: Date) {
  // Implementation of Intl.DateTimeFormat
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
