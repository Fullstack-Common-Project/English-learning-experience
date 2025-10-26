'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import DoubleVisionGame from '@/games/DoubleVisionGame';

export default function SentenceShufflePage() {

  const handleGameOver = () => {
    console.log("🎮 Game is finish");
  };

  return (
    <GameLayout gameTitle="👀 Double Vision">
        <DoubleVisionGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
