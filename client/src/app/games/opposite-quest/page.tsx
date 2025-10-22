// src/app/games/opposite-quest/page.tsx
'use client';

import React from 'react';
import GameLayout from '@/components/common/GameLayout';
import OppositeQuestGame from '@/games/OppositeQuestGame';

export default function OppositeQuestPage() {

  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="🕵️‍♂️ Opposite Quest">
   <OppositeQuestGame onGameOver={handleGameOver} />
   </GameLayout>
  );
}
