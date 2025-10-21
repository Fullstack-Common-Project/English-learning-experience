"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerProps {
  isActive?: boolean;   // האם הטיימר רץ
  onStop?: (time: number) => void; // מחזיר את הזמן הסופי כשהטיימר נעצר
  position?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
}

export function Timer({ isActive = true, onStop, position = "top-right" }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (onStop) onStop(seconds);
    };
  }, [isActive]);

  // ✅ מיקום דינמי בהתאם לפרופס
  const positionClasses = {
    "top-right": "top-4 right-6",
    "top-left": "top-4 left-6",
    "bottom-right": "bottom-4 right-6",
    "bottom-left": "bottom-4 left-6",
  }[position];

  return (
    <AnimatePresence>
      <motion.div
        key="timer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`fixed ${positionClasses} z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-indigo-200`}
      >
        <span className="text-indigo-700 font-semibold text-sm flex items-center gap-1">
          ⏱️ {seconds}s
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
