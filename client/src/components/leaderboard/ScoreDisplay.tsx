'use client';
import React from 'react';

interface ScoreDisplayProps {
  score: number; // ניקוד נוכחי
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="bg-green-600 text-white px-4 py-2 rounded-xl shadow">
      <p className="font-semibold text-xl">⭐ ניקוד {score}</p>
    </div>
  );
};
