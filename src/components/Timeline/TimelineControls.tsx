import React from "react";

interface TimelineControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  viewMode: "day" | "week" | "month";
  onViewChange: (mode: "day" | "week" | "month") => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  onZoomIn,
  onZoomOut,
  viewMode,
  onViewChange,
}) => (
  <div className="flex items-center mb-4 gap-2">
    <button className="px-3 py-1 bg-neutral-200 rounded hover:bg-neutral-300" onClick={onZoomOut}>
      −
    </button>
    <button className="px-3 py-1 bg-neutral-200 rounded hover:bg-neutral-300" onClick={onZoomIn}>
      +
    </button>
    <select
      className="border rounded px-2 py-1 bg-white ml-2"
      value={viewMode}
      onChange={e => onViewChange(e.target.value as any)}
    >
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
    </select>
  </div>
);

export default TimelineControls;
