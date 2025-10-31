import React from "react";
import type { TimelineTask } from "../../types/timeline.types";
import clsx from "clsx";

interface TimelineItemProps {
  task: TimelineTask;
  position: { left: number; width: number };
  selected?: boolean;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  onClick: (task: TimelineTask) => void;
  onResizeStart: (taskId: string, edge: "left" | "right") => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  task,
  position,
  selected,
  onDragStart,
  onDragEnd,
  onClick,
  onResizeStart,
}) => {
  // Handle drag start with proper data transfer
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(task.id);
  };

  // Handle click with event propagation control
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(task);
  };

  // Handle resize with event propagation control
  const handleResizeStart = (e: React.MouseEvent, edge: "left" | "right") => {
    e.stopPropagation();
    onResizeStart(task.id, edge);
  };

  // Get color class based on task color or category
  const getColorClass = () => {
    if (task.color) {
      return `color-${task.color}`;
    }
    
    // Fallback colors based on task properties
    if (task.isMilestone) return "color-purple";
    if (task.progress === 100) return "color-green";
    
    // Default color based on row or other logic
    return "color-blue";
  };

  // For milestones, render a different UI
  if (task.isMilestone) {
    return (
      <div
        className={clsx("timeline-item", "milestone", getColorClass(), { 
          selected,
          "milestone-completed": task.progress === 100 
        })}
        style={{ 
          left: `${position.left}px`,
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onClick={handleClick}
        title={`${task.title} (Milestone)`}
      >
        <div className="milestone-marker" />
        {task.progress === 100 && (
          <div className="milestone-check">✓</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx("timeline-item", getColorClass(), { 
        selected,
        "task-completed": task.progress === 100 
      })}
      style={{ 
        left: `${position.left}px`, 
        width: `${Math.max(position.width, 24)}px`, // Minimum width for visibility
        // @ts-ignore - CSS custom property
        "--progress": `${task.progress}%`
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      title={`${task.title} - ${task.progress}% complete`}
    >
      {/* Progress bar background */}
      <div className="task-progress-background" />
      
      {/* Main task content */}
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.progress > 0 && (
          <span className="task-progress-text">{task.progress}%</span>
        )}
      </div>

      {/* Dependency indicator */}
      {task.dependencies && task.dependencies.length > 0 && (
        <div className="dependency-indicator" title={`Depends on ${task.dependencies.length} task(s)`}>
          {task.dependencies.length}
        </div>
      )}

      {/* Resize handles - only show if task is wide enough */}
      {position.width > 40 && (
        <>
          <div
            className="resize-handle left"
            onMouseDown={(e) => handleResizeStart(e, "left")}
            title="Resize left"
          />
          <div
            className="resize-handle right"
            onMouseDown={(e) => handleResizeStart(e, "right")}
            title="Resize right"
          />
        </>
      )}

      {/* Overdue indicator */}
      {task.endDate < new Date() && task.progress < 100 && (
        <div className="overdue-indicator" title="Overdue" />
      )}
    </div>
  );
};

export default TimelineItem;