

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Returns the number of days between two dates (inclusive)
 */
export function daysBetween(start: Date, end: Date): number {
  const startTime = start.setHours(0, 0, 0, 0);
  const endTime = end.setHours(0, 0, 0, 0);
  return Math.round((endTime - startTime) / MS_PER_DAY);
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

/**
 * Format a date as "Oct 05, 2024"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Generate a range of dates between start and end (inclusive)
 */
export function generateDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const totalDays = daysBetween(start, end);
  for (let i = 0; i <= totalDays; i++) {
    dates.push(addDays(start, i));
  }
  return dates;
}

/**
 * Check if a given date is a weekend
 */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Clamp a date within a range (used in drag/drop timeline)
 */
export function clampDate(date: Date, min: Date, max: Date): Date {
  if (date < min) return min;
  if (date > max) return max;
  return date;
}

/**
 * Aligns a date to start of day (00:00)
 */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Aligns a date to end of day (23:59)
 */
export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
