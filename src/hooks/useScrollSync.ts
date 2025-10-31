import { useRef } from "react";

export function useScrollSync<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const syncScroll = () => {
    // Optionally: synchronize scroll positions between elements
    // Example: use in grid/time header sync
  };

  return { ref, syncScroll };
}
