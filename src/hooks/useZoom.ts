import { useCallback } from "react";
import type {ViewMode} from "./useTimeline";

export function useZoom(currentMode: ViewMode, setViewMode: (mode: ViewMode) => void) {
  const zoomIn = useCallback(() => {
    if (currentMode === "month") setViewMode("week");
    else if (currentMode === "week") setViewMode("day");
  }, [currentMode, setViewMode]);

  const zoomOut = useCallback(() => {
    if (currentMode === "day") setViewMode("week");
    else if (currentMode === "week") setViewMode("month");
  }, [currentMode, setViewMode]);

  return { zoomIn, zoomOut };
}
