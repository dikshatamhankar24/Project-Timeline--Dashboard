export const calculatePosition = (date: Date, startDate: Date, pixelsPerDay: number): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSinceStart = (date.getTime() - startDate.getTime()) / msPerDay;
  return Math.round(daysSinceStart * pixelsPerDay);
};

export const calculateDuration = (startDate: Date, endDate: Date, pixelsPerDay: number): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const durationDays = (endDate.getTime() - startDate.getTime()) / msPerDay;
  return Math.round(durationDays * pixelsPerDay);
};
