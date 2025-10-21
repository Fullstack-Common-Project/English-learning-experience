"use client";
import { useEffect } from "react";

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const action = shortcuts[e.key];
      if (action) action();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [shortcuts]);
}
