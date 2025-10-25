'use client';
import GameLayout from '@/components/common/GameLayout';
import MemoryAntonymsGame from '@/games/MemoryAntonymsGame';


export default function MiniWordlePage() {

    
  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="memory-antonyms">
        <MemoryAntonymsGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
