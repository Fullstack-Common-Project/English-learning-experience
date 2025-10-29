'use client';
import React from 'react';
import GameLayout from '@/components/common/GameLayout';
import LetterChaosGame from '@/games/LetterChaosGame';

export default function LetterChaosPage() {

  return (
    <GameLayout gameTitle="Letter Chaos">
        <LetterChaosGame />
    </GameLayout>
  );
}
