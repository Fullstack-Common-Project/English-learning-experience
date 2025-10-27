'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import PicPickGame from '@/games/PicPickGame';

export default function PicPickPage() {

  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="🧩 Pic Pick">
        <PicPickGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
