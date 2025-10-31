import { useEffect, useCallback } from "react";

// Usage: Pass a list of item IDs, the currently focused ID, and a callback to set focus

export function useKeyboardNavigation<T extends string | number>(
  items: T[],                 // List of timeline item IDs
  focusedId: T | null,        // The currently focused item ID
  setFocusedId: (id: T) => void,
  onSelect?: (id: T) => void  // (Optional) Called when an item is "selected" by Enter/Space
) {
  const getIndex = useCallback((id: T) => items.findIndex(item => item === id), [items]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!items.length) return;

      let index = focusedId ? getIndex(focusedId) : -1;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        // Move focus to next item
        event.preventDefault();
        if (index < items.length - 1) setFocusedId(items[index + 1]);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        // Move focus to previous item
        event.preventDefault();
        if (index > 0) setFocusedId(items[index - 1]);
      } else if (event.key === "Home") {
        event.preventDefault();
        setFocusedId(items[0]);
      } else if (event.key === "End") {
        event.preventDefault();
        setFocusedId(items[items.length - 1]);
      } else if ((event.key === "Enter" || event.key === " ") && focusedId && onSelect) {
        event.preventDefault();
        onSelect(focusedId);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, focusedId, setFocusedId, onSelect, getIndex]);
}
