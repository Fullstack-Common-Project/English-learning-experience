'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import SentenceShuffleGame from '@/games/SentenceShuffleGame';
import WordSorterGame from '@/games/WordSorter/WordSorterGame';

export default function WordSorterPage() {

  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="🗃️ Word Sorter-Category Challenge">
        <WordSorterGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
