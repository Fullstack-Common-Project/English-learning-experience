'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import LetterChaosGame from '@/games/LetterChaosGame';
import { GameId } from '@/types';

export default function SentenceShufflePage() {

  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="Letter Chaos">
        <LetterChaosGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
