export function formatDate(date: Date, locale: string = 'es-ES'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatDateTime(date: Date, locale: string = 'es-ES'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function isRecent(date: Date, days: number = 7): boolean {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= days;
}