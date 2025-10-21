"use client";
import useGameTimer from "@/hooks/useGameTimer";
import { useEffect } from "react";

interface TimerProps {
  running: boolean;
  gameOver: boolean;
  onFinish?: (timeSec: number) => void;
  reset?: boolean;
}

export default function Timer({ running, gameOver, onFinish, reset }: TimerProps) {
  const { time, start, stop, reset: resetTimer } = useGameTimer(0);

  // שליטה בהפעלה ועצירה
  useEffect(() => {
    if (running) start();
    else stop();
  }, [running]);

  // איפוס
  useEffect(() => {
    if (reset) resetTimer(0);
  }, [reset]);

  // כשהמשחק נגמר - שלח זמן סופי
  useEffect(() => {
    if (gameOver && onFinish) {
      stop();
      onFinish(time);
    }
  }, [gameOver, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="timer-display">
      {minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}
