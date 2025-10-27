'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameData } from "@/hooks/useGameData";
import { GameProps } from "@/components/common/GameLayout";
type Pair = {
  word: string;
  synonym: string;
};

type Card = {
  id: number;
  text: string;
  pairId: number;
  flipped: boolean;
  matched: boolean;
};
const demoPairs: Pair[] = [
  { word: "Happy", synonym: "Joyful" },
  { word: "Quick", synonym: "Fast" },
  { word: "Big", synonym: "Large" },
  { word: "Smart", synonym: "Intelligent" },
  { word: "Angry", synonym: "Mad" },
  { word: "Cold", synonym: "Chilly" },
  { word: "Easy", synonym: "Simple" },
  { word: "Hard", synonym: "Difficult" },
];


export default function MemoryMatchSynonymsGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId = 8; // הערך המתאים ל-MemorySynonymsResponse במפה שלך
  const { data, isError } = useGameData(gameId);

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  // בונה את הקלפים מה data או demo
  const initCards = (pairs: Pair[]) => {
    const newCards: Card[] = pairs.flatMap((pair, index) => ([
      { id: index * 2, text: pair.word, pairId: index, flipped: false, matched: false },
      { id: index * 2 + 1, text: pair.synonym, pairId: index, flipped: false, matched: false },
    ])).sort(() => Math.random() - 0.5);
    setCards(newCards);
    setFlippedIds([]);
    setCompleted(false);
  };

 useEffect(() => {
  const pairsToUse =
    data?.pairs?.pairs && Array.isArray(data.pairs.pairs)
      ? data.pairs.pairs
      : demoPairs;

  initCards(pairsToUse);
}, [data, isError]);


  const handleFlip = (id: number) => {
    if (paused) return;
    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map(i => newCards.find(c => c.id === i)!);
      if (first.pairId === second.pairId) {
        setCards(prev => prev.map(c => 
          c.pairId === first.pairId ? { ...c, matched: true } : c
        ));
        onScoreChange?.((prev) => (prev ?? 0) + 10);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c
          ));
        }, 1000);
      }
      setFlippedIds([]);
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setCompleted(true);
      onGameOver?.();
    }
  }, [cards]);

  if (cards.length === 0) return <p className="text-center mt-10">Loading...</p>;
  if (completed) return <p className="text-center mt-10 text-green-600 font-bold">🎉 כל הזוגות נחשפו!</p>;

  return (
    <div className="memory-game grid grid-cols-4 gap-4 max-w-md mx-auto mt-6">
      {cards.map(card => (
        <motion.div
          key={card.id}
          layout
          onClick={() => !card.flipped && !card.matched && handleFlip(card.id)}
          className={`cursor-pointer p-4 rounded shadow text-center text-white select-none
            ${card.flipped || card.matched ? "bg-green-500" : "bg-blue-500"}`}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {card.flipped || card.matched ? (
              <motion.span
                key="front"
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {card.text}
              </motion.span>
            ) : (
              <motion.span
                key="back"
                initial={{ rotateY: 0, opacity: 1 }}
                animate={{ rotateY: 180, opacity: 1 }}
                exit={{ rotateY: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                ❓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
