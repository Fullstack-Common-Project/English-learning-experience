'use client';
import React, { useState } from 'react';
import  Timer  from '../components/leaderboard/Timer'

export default function SentenceShuffleGame() {
 const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalTime, setFinalTime] = useState<number | null>(null);

  const handleGameEnd = (time: number) => {
    setFinalTime(time);
    console.log('Game ended at:', time / 1000, 'seconds');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f1320', minHeight: '100vh', color: '#e9edf5' }}>
      <h1>Sentence Shuffle Demo</h1>

      {/* {!running && !gameOver && (
        <button onClick={() => setRunning(true)}>Start Game</button>
      )}

      {running && !gameOver && (
        <button onClick={() => setGameOver(true)}>End Game</button>
      )}

      <Timer running={running} gameOver={gameOver} onFinish={handleGameEnd} /> */}

      {finalTime !== null && (
        <p>⏱ Final time: {(finalTime / 1000).toFixed(1)} seconds</p>
      )}
    </div>
  );
}
