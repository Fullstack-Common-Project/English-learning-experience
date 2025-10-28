'use client';
import GameLayout from '@/components/common/GameLayout';
import MemorySynonymsGame from '@/games/MemorySynonymsGame';


export default function MiniWordlePage() {

    
  const handleGameOver = () => {
    console.log("🎮 המשחק הסתיים! זמן והניקוד מטופלים ב-GameLayout");
  };

  return (
    <GameLayout gameTitle="Synonyms Match">
        <MemorySynonymsGame onGameOver={handleGameOver} />
    </GameLayout>
  );
}
