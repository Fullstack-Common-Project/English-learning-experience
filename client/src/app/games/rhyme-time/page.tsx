"use client";

import React from "react";
import GameLayout from "@/components/common/GameLayout";
import RhymeTimeGame from "@/games/RhymeTimeGame";

export default function RhymeTimePage() {
  const handleGameOver = () => {
    console.log("🎮 The 'Rhyme Time' Game Over!");
  };

  return (
    <GameLayout gameTitle="🎵 Rhyme Time">
      <RhymeTimeGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
