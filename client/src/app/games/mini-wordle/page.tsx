'use client';
import GameLayout from '@/components/common/GameLayout';
import MiniWordleGame from '@/games/MiniWordleGame';

export default function MiniWordlePage() {

    
  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="Mini Wordle">
        <MiniWordleGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
