'use client';

import React from 'react';
import GameLayout from '@/components/common/GameLayout';
import MemoryMatchSynonymsGame from '@/games/MemorySynonymsGame';

export default function MemoryMatchSynonymsPage() {

  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="🧠 Memory Match: Synonyms">
      <MemoryMatchSynonymsGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
