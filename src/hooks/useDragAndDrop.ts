import { useRef } from "react";

export function useDragAndDrop<T>(onDrop: (item: T, position: number) => void) {
  const dragItemRef = useRef<T | null>(null);

  const onDragStart = (item: T) => {
    dragItemRef.current = item;
  };

  const onDragEnd = (position: number) => {
    if (dragItemRef.current) {
      onDrop(dragItemRef.current, position);
      dragItemRef.current = null;
    }
  };

  return { onDragStart, onDragEnd };
}
