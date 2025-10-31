import React from "react";
import  type { TimelineRow } from "../../types/timeline.types";

interface ResourceRowProps {
  row: TimelineRow;
  selected?: boolean;
  onClick?: (row: TimelineRow) => void;
}

const ResourceRow: React.FC<ResourceRowProps> = ({ row, selected, onClick }) => (
  <div
    className={`flex items-center px-2 h-16 border-b cursor-pointer ${selected ? "bg-blue-100" : ""}`}
    onClick={() => onClick?.(row)}
    role="region"
    aria-label={`${row.label} timeline. ${row.tasks.length} tasks.`}
    tabIndex={0}
  >
    {row.avatar && (
      <img
        src={row.avatar}
        alt=""
        className="w-6 h-6 rounded-full mr-2"
      />
    )}
    <span className="font-medium">{row.label}</span>
    <span className="ml-2 text-xs text-gray-400">{row.tasks.length} tasks</span>
  </div>
);

export default ResourceRow;
