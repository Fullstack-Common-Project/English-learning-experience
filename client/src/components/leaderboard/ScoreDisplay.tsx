'use client';
import React from 'react';

interface ScoreDisplayProps {
  score: number; // ניקוד נוכחי
}

export  default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="font-mono text-lg font-semibold px-4 py-2 bg-amber-500 text-white rounded-xl shadow hover:scale-105 transition-transform">
      Score: {score}
    </div>
  );
};
