"use client";
import { useEffect, useState, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { mockPairs } from "@/types/MemoryAntonymsMockData";
import { GameId } from "@/types/index";
import { useGameData } from "@/hooks/useGameData";

export interface CardItem {
  id: string;
  pairId: number;
  text: string;
}

export default function MemoryAntonymsGame({
  onScoreChange,
  onGameOver,
  paused,
}: GameProps) {
  const gameId: GameId = 11;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // יוצרים את הקלפים על פי המילים (16 קלפים)
  useEffect(() => {
    const pairs = data?.data?.data?.pairs; // שימו לב ל-"data.data.data"
    if (!pairs) return;
  
    const allCards: CardItem[] = [];
    pairs.slice(0, 8).forEach((p, idx) => {
      allCards.push({
        id: `${idx}-A`,
        pairId: idx,
        text: p.wordA,
        flipped: false,
        matched: false,
      });
      allCards.push({
        id: `${idx}-B`,
        pairId: idx,
        text: p.wordB,
        flipped: false,
        matched: false,
      });
    });
  
    setCards(shuffleArray(allCards));
  }, [data]);
  

  const shuffleArray = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

  const handleCardClick = (card: CardItem) => {
    if (paused || card.flipped || card.matched || flippedCards.length === 2) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        // התאמה נכונה
        const matchedCards = updatedCards.map((c) =>
          c.pairId === first.pairId ? { ...c, matched: true } : c
        );
        setTimeout(() => {
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedCount((prev) => prev + 1);
          setScore((prev) => prev + 10);
          onScoreChange?.((prev) => prev + 10);
        }, 500);
      } else {
        // לא התאמה
        setTimeout(() => {
          const resetCards = updatedCards.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, flipped: false }
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (matchedCount === 8) {
      setCompleted(true);
      onGameOver?.();
    }
  }, [matchedCount]);

  return (
    <div className="page-container">
      <div className="card text-center space-y-6">
        <h3 className="text-2xl font-bold text-indigo-400">
          🧠 Find the Opposite Words
        </h3>
        <p className="text-lg text-slate-300">Score: {score}</p>

        {completed ? (
          <p className="text-2xl text-emerald-400 font-semibold">
            🎉 כל הזוגות נמצאו!
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={paused || card.matched}
                className={`game-card transition-all duration-300 transform ${
                  card.flipped || card.matched
                    ? "bg-indigo-600 text-white scale-105 shadow-lg"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:scale-105"
                }`}
              >
                <span className="text-lg font-semibold select-none">
                  {card.flipped || card.matched ? card.text : "?"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
