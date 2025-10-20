'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import SentenceShuffleGame from '@/games/SentenceShuffleGame';
import HelpScreen from '@/components/leaderboard/HelpScreen';

export default function SentenceShufflePage() {
  
  const handleGameOver = (finalScore: number) => {
    console.log("🎮 המשחק הסתיים! ניקוד סופי:", finalScore);
  };

  return (
    <GameLayout gameTitle="🧩 Sentence Shuffle">
      <SentenceShuffleGame />
    </GameLayout>
  );
}