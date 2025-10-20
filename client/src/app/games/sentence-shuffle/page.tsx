// 'use client';
// import React, { useState } from 'react';
// import GameLayout from '@/components/common/GameLayout';
// import SentenceShuffleGame from '@/games/SentenceShuffleGame';
// import HelpScreen from '@/components/leaderboard/HelpScreen';

// export default function SentenceShufflePage() {
  
//   const handleGameOver = (finalScore: number) => {
//     console.log("🎮 המשחק הסתיים! ניקוד סופי:", finalScore);
//   };

//   return (
//     <GameLayout gameTitle="🧩 Sentence Shuffle">
//       <SentenceShuffleGame />
//     </GameLayout>
//   );
// }

'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import SentenceShuffleGame from '@/games/SentenceShuffleGame';
import ScoreDisplay from '@/components/leaderboard/ScoreDisplay';
import GameOverModal from '@/components/leaderboard/GameOverModal';
import PauseOverlay from '@/components/hud/pauseOverlay';
import ProgressBar from '@/components/hud/progressBar';
import Timer from '@/components/leaderboard/Timer';

export default function SentenceShufflePage() {

  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="🧩 Sentence Shuffle">
        <SentenceShuffleGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
