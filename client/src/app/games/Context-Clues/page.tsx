"use client";
import React from "react";
import GameLayout from "@/components/common/GameLayout";
import ContextCluesGame from "@/games/ContextCluesGame";

export default function ContextCluesPage() {
  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="🧩 Context Clues">
      <ContextCluesGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
