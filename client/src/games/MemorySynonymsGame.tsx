"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameProps } from "@/components/common/GameLayout";
import { GameId } from "@/types/index";
import { useGameData } from "@/hooks/useGameData";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { useSelector } from "react-redux";

export interface CardItem {
  id: string;
  pairId: number;
  text: string;
  flipped?: boolean;
  matched?: boolean;
}

export default function MemorySynonymsGame({
  onScoreChange,
  onGameOver,
  paused,
  time,
}: GameProps) {
  const gameId: GameId = 8;
  const user = useSelector((state: any) => state.user.user);
  const submitProgressMutation = useSubmitProgress();
  const { data, isLoading, isError } = useGameData(gameId);

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const timeRef = useRef(time);
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  // אתחול הכרטיסים
  useEffect(() => {
    const pairs = data?.data?.data?.pairs;
    if (!pairs) return;

    const allCards: CardItem[] = [];
    pairs.slice(0, 8).forEach((p: { word: any; synonym: any; }, idx: any) => {
      allCards.push({
        id: `${idx}-A`,
        pairId: idx,
        text: p.word,
        flipped: false,
        matched: false,
      });
      allCards.push({
        id: `${idx}-B`,
        pairId: idx,
        text: p.synonym,
        flipped: false,
        matched: false,
      });
    });

    setCards(shuffleArray(allCards));
  }, [data]);

  const shuffleArray = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

  // טיפול בלחיצה על כרטיס
  const handleCardClick = (card: CardItem) => {
    if (paused || card.flipped || card.matched || flippedCards.length === 2)
      return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        // ✅ זוג נכון
        setTimeout(() => setFeedback("correct"), 600);
        const matchedCards = updatedCards.map((c) =>
          c.pairId === first.pairId ? { ...c, matched: true } : c
        );

        setTimeout(() => {
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedCount((prev) => prev + 1);
          setScore((prev) => prev + 10);
          onScoreChange?.((prev) => prev + 10);
          setFeedback(null);
        }, 1600);
      } else {
        // ❌ זוג שגוי
        setTimeout(() => setFeedback("wrong"), 600);
        setMistakesCount((prev) => prev + 1);

        setTimeout(() => {
          const resetCards = updatedCards.map((c) =>
            c.id === first.id || c.id === second.id
              ? { ...c, flipped: false }
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
          setFeedback(null);
        }, 1600);
      }
    }
  };

  // 🎯 תנאי סיום – כל הזוגות או יותר מדי טעויות
  useEffect(() => {
    if (matchedCount === 8 || mistakesCount >= 8) {
      setCompleted(true);
      onGameOver?.();
      submitProgressMutation.mutate({
        gameID: gameId,
        userID: user?.userId!,
        score,
        time: timeRef.current ?? 0,
        rounds: matchedCount,
      });
    }
  }, [matchedCount, mistakesCount]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || cards.length === 0)
    return <p className="text-center mt-10">No data available.</p>;

  return (
    <div className="page-container relative">
      {completed ? (
        mistakesCount >= 8 ? (
          <p className="text-2xl text-red-500 font-semibold text-center mt-10">
            ❌ המשחק הסתיים! הגעת ל-8 ניסיונות שגויים.
          </p>
        ) : (
          <p className="text-2xl text-emerald-400 font-semibold text-center mt-10">
            🎉 כל הזוגות נמצאו!
          </p>
        )
      ) : (
        <div className="grid grid-cols-4 gap-x-8 gap-y-8 max-w-3xl mx-auto mt-10 place-items-center">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="relative w-28 h-28 sm:w-32 sm:h-32 cursor-pointer perspective"
              onClick={() => handleCardClick(card)}
            >
              <motion.div
                className="relative w-full h-full transition-transform duration-500"
                animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* צד קדמי */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800/90 text-slate-300 rounded-xl backface-hidden border-2 border-slate-600 shadow-md">
                  ❔
                </div>

                {/* צד אחורי */}
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600 text-white rounded-xl font-bold rotate-y-180 backface-hidden border-2 border-indigo-700 shadow-md">
                  {card.text}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ פידבק (נכון/שגוי) */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className={`text-4xl font-extrabold px-8 py-6 rounded-2xl shadow-2xl bg-opacity-80 backdrop-blur-md
                ${
                  feedback === "correct"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
            >
              {feedback === "correct" ? "✅ Match!" : "❌ Try Again!"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    
    </div>
  );
}
