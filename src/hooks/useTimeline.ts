import { useMemo } from "react";

export type ViewMode = "day" | "week" | "month";

export interface TimelineState {
  pixelsPerDay: number;
  todayPosition: number;
}

/**
 * Calculates timeline scaling and "Today" line position.
 */
export function useTimeline(startDate: Date, endDate: Date, viewMode: ViewMode): TimelineState {
  return useMemo(() => {
    const totalDays = Math.max(
      1,
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    );

    // scale per day based on zoom level
    const pixelsPerDay =
      viewMode === "month" ? 30 : viewMode === "week" ? 80 : 120;

    // calculate today position
    const today = new Date();
    const diffInDays = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const todayPosition =
      diffInDays >= 0 && diffInDays <= totalDays ? diffInDays * pixelsPerDay : -9999;

    return { pixelsPerDay, todayPosition };
  }, [startDate, endDate, viewMode]);
}
