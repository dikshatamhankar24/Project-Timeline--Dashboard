// ✅ Format date into a readable label
export const formatDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// ✅ Generate timeline scale based on view mode
export const generateTimeScale = (
  startDate: Date,
  endDate: Date,
  viewMode: "day" | "week" | "month"
): Array<{ date: Date; label: string }> => {
  const scale: Array<{ date: Date; label: string }> = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    if (viewMode === "day") {
      scale.push({
        date: new Date(current),
        label: current.toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
        }),
      });
      current.setDate(current.getDate() + 1);
    } else if (viewMode === "week") {
      scale.push({
        date: new Date(current),
        label: `Week ${getWeekNumber(current)}`,
      });
      current.setDate(current.getDate() + 7);
    } else if (viewMode === "month") {
      scale.push({
        date: new Date(current),
        label: current.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        }),
      });
      current.setMonth(current.getMonth() + 1);
    }
  }

  return scale;
};

// ✅ Get ISO week number (used for week view)
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number (Monday=1, Sunday=7)
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
};
