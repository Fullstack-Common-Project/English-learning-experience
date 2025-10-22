"use client";
import { useState, useRef } from "react";
import { GameComponentProps } from "@/types/game";
import GameHUD from "@/components/hud/GameHUD";
import Timer from "@/components/hud/Timer";
import ScoreCounter from "@/components/hud/ScoreCounter";
import PrimaryButton from "@/components/controls/PrimaryButton";
import moduleName from 'module'
import Footer from "@/components/common/Footer";

export default function GuessMaster20Game({ playerName, onGameEnd }: GameComponentProps) {
  const [score, setScore] = useState(0);
  const elapsedMs = useRef(0);

  function finish() {
    onGameEnd(score, elapsedMs.current); // חובה! אחרת Results/Leaderboard לא יופיעו
  }

  return (
    <div className="page-container">
      <GameHUD
        leftSlot={<ScoreCounter value={score} />}
        rightSlot={
          <Timer
            mode="down"
            initialMs={20 * 60 * 1000}
            onTick={(ms) => { elapsedMs.current = (20 * 60 * 1000) - ms; }}
            onComplete={finish}
          />
        }
      />
      {/* כאן יבוא אזור השאלות/ניחוש */}
      <div className="card grid gap-3">
        <PrimaryButton onClick={finish}>סיום (דמו)</PrimaryButton>
      </div>
    </div>
  );
}
