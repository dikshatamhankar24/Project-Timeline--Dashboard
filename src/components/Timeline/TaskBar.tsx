import React, { useState, useRef, useEffect } from "react";
import type { TimelineTask } from "../../types/timeline.types";

interface TaskBarProps {
  task: TimelineTask;
  position: { left: number; width: number };
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onClick: (task: TimelineTask) => void;
  isSelected?: boolean;
}

export const TaskBar: React.FC<TaskBarProps> = ({
  task,
  position,
  onDragStart,
  onDragEnd,
  onClick,
  isSelected = false,
}) => {
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.scrollWidth + 40; // dynamic width padding
      setTextWidth(width);
    }
  }, [task.title]);

  const isComplete = task.progress === 100;
  const barWidth = Math.max(position.width, textWidth);

  // Subtle gradient background
  const barColor = isComplete
    ? task.color
    : `linear-gradient(90deg, ${task.color} 0%, ${lighten(task.color, 30)} 100%)`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={task.title}
      className={`transition-all duration-300 ease-in-out select-none shadow-md 
        ${isSelected ? "ring-2 ring-cyan-400 scale-[1.02]" : ""}
        hover:scale-[1.03] hover:shadow-lg cursor-pointer overflow-visible`}
      style={{
        left: position.left,
        width: barWidth,
        top: 10,
        height: task.isMilestone ? 26 : 38,
        background: barColor,
        position: "absolute",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 8,
        color: "white",
        fontWeight: 500,
      }}
      onMouseDown={() => onDragStart(task.id)}
      onMouseUp={onDragEnd}
      onClick={() => onClick(task)}
    >
      {/* Task Title */}
      <span
        ref={textRef}
        style={{
          whiteSpace: "nowrap",
          overflow: "visible",
          fontSize: 13,
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        {task.title}
      </span>

      {/* Progress Badge */}
      {!task.isMilestone && (
        <span
          style={{
            fontSize: 11,
            background: "rgba(255,255,255,0.25)",
            padding: "3px 6px",
            borderRadius: 12,
            fontWeight: 500,
          }}
        >
          {task.progress}%
        </span>
      )}
    </div>
  );
};

// 🌈 Helper to lighten task color
function lighten(hex: string, percent = 20) {
  try {
    const c = hex.replace("#", "");
    const num = parseInt(c, 16);
    let r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
    let g = ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100));
    let b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch {
    return hex;
  }
}
