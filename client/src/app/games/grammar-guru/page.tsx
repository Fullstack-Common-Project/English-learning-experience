'use client';
import React from 'react';
import GameLayout from '@/components/common/GameLayout';
import GrammarGuruGame from '@/games/GrammarGuruGame';

export default function GrammarGuruPage() {
  const handleGameOver = () => {
    console.log("The game is over! Score and time handled in GameLayout");
  };

  return (
    <GameLayout gameTitle="Grammar Guru">
      <GrammarGuruGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
