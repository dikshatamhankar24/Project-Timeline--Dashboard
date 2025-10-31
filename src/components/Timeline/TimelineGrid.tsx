import React from "react";
import type { TimelineTask, TimelineRow } from "../../types/timeline.types";
import { TaskBar } from "./TaskBar";

interface TimelineGridProps {
  rows: TimelineRow[];
  tasks: TimelineTask[];
  startDate: Date;
  endDate: Date;  // keep as Date type
  viewMode: string;
  pixelsPerDay: number;
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;

  onTaskMove: (taskId: string, newStartDate: Date, newEndDate: Date) => void;
  onResizeStart?: (taskId: string, edge: "left" | "right") => void;
  selectedTaskId?: string;
  onTaskClick: (task: TimelineTask) => void;
}

const TimelineGrid: React.FC<TimelineGridProps> = ({
  rows,
  tasks,
  startDate,
  endDate: _endDate,  // underscore prefix to suppress 'unused' error
  pixelsPerDay,
  selectedTaskId,
  onTaskClick,
}) => {
  const getPosition = (task: TimelineTask) => {
    const startOffset = (new Date(task.startDate).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const durationDays =
      (new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24);
    const left = Math.round(startOffset * pixelsPerDay) + 8;
    const width = Math.max(28, Math.round(durationDays * pixelsPerDay) - 8);
    return { left, width };
  };

  return (
    <div
      className="timeline-grid relative w-full fade-in"
      style={{
        minHeight: rows.length * 100,
        background:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 79px, transparent 80px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 79px, transparent 80px)",
      }}
    >
      {rows.map((row, rowIndex) => {
        const rowTasks = tasks.filter((task) => task.rowId === row.id);
        return (
          <div
            key={row.id}
            className="absolute w-full border-t border-gray-600/40 dark:border-gray-700/50"
            style={{
              top: rowIndex * 100,
              height: 100,
              zIndex: rowIndex + 2,
              position: "absolute",
            }}
          >
            {rowTasks.map((task) => {
              const position = getPosition(task);
              return (
                <div
                  key={task.id}
                  style={{
                    position: "absolute",
                    left: position.left,
                    width: position.width,
                    top: 25,
                    zIndex: 10,
                  }}
                >
                  <TaskBar
                    task={task}
                    position={position}
                    onDragStart={() => {}}
                    onDragEnd={() => {}}
                    onClick={onTaskClick}
                    isSelected={selectedTaskId === task.id}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TimelineGrid;
