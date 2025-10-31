import type { TimelineTask } from "../types/timeline.types";

export function isValidDate(date: unknown): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function validateTaskDates(task: TimelineTask): boolean {
  return (
    isValidDate(task.startDate) &&
    isValidDate(task.endDate) &&
    task.startDate <= task.endDate
  );
}

export function validateProgress(progress: number): boolean {
  return typeof progress === "number" && progress >= 0 && progress <= 100;
}

export function isTaskValid(task: TimelineTask): boolean {
  return validateTaskDates(task) && validateProgress(task.progress) && !!task.title;
}
