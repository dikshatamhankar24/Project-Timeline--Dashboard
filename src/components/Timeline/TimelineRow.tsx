import React from "react";
import type { TimelineRow } from "../../types/timeline.types";

interface TimelineRowProps {
  row: TimelineRow;
  isCollapsed?: boolean;
  onToggleCollapse?: (rowId: string) => void;
}

// Avatar image should be in public/avatars or from a URL
const TimelineRowComponent: React.FC<TimelineRowProps> = ({
  row,
  isCollapsed,
  onToggleCollapse,
}) => (
  <div
    className="flex items-center gap-3 px-4 py-2 border-b border-neutral-200 hover:bg-neutral-100 transition group cursor-pointer focus-within:bg-neutral-100"
    tabIndex={0}
    role="region"
    aria-label={`${row.label} timeline row`}
    onKeyDown={(e) => {
      if ((e.key === " " || e.key === "Enter") && onToggleCollapse)
        onToggleCollapse(row.id);
    }}
  >
    {row.avatar && (
      <img
        src={row.avatar}
        alt={`${row.label} avatar`}
        className="w-8 h-8 rounded-full object-cover border border-neutral-300 bg-white"
      />
    )}
    <span className="truncate text-base text-neutral-900 font-medium flex-1">
      {row.label}
    </span>
    {onToggleCollapse && (
      <button
        className="ml-2 outline-none focus:ring ring-primary-400 rounded p-1"
        aria-label={isCollapsed ? "Expand row" : "Collapse row"}
        onClick={() => onToggleCollapse(row.id)}
      >
        <svg
          className={`w-4 h-4 transition ${isCollapsed ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    )}
  </div>
);

export default TimelineRowComponent;
