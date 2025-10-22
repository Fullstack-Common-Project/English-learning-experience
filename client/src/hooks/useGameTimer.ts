import { useState, useEffect, useRef } from "react";

export default function useGameTimer(startMs: number = 0) {
  const [time, setTime] = useState(startMs);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = (newStart: number = 0) => setTime(newStart);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return { time, start, stop, reset, running };
}
