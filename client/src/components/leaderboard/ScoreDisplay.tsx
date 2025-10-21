'use client';
import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="score-display">
      <p className="score-display__text">⭐ Score: {score}</p>
    </div>
  );
}
