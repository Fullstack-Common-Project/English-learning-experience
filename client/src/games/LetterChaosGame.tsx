"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDragAndDrop, DraggableItem } from "@/hooks/useDragAndDrop";
import { GameProps } from "@/components/common/GameLayout";
import { useGameData } from "@/hooks/useGameData";
import { GameId } from "@/types";
import { LetterChaosItemSingle } from "@/types/gamesTypes/LetterChaos";

const generateId = () => Math.floor(Math.random() * 10000).toString();

export default function LetterChaosGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId: GameId = 3;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  //להסיר..
  console.log(data)

  const [words, setWords] = useState<LetterChaosItemSingle[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastWrongWord, setLastWrongWord] = useState<string | null>(null);
  const [isRestarting, setIsRestarting] = useState(false);

  useEffect(() => {
    if (!data) return;
    const wordsFromApi: LetterChaosItemSingle[] = data?.data?.data?.words || [];
    if (wordsFromApi.length) {
      setWords(wordsFromApi);           
      setCurrentWordIndex(0);        
      setStatus("idle");
      setLastWrongWord(null);
    }
  }, [data]);

  const currentWord = words[currentWordIndex];

  const initialLetters = useMemo(() => {
    if (!currentWord?.correctWord) return [];
    return currentWord.scrambled.split("").map(l => ({ id: generateId(), value: l }));
  }, [currentWord]);

  const { availableItems, selectedSlots, draggedItem, handleDragStart, handleDragEnd, handleDrop, handleItemSelect, handleDeselectItem } =
    useDragAndDrop<DraggableItem>(initialLetters, currentWord?.correctWord?.length ?? 0, paused || status !== "idle", status);

  const currentGuess = selectedSlots.filter((l) => l !== null).map((l) => l!.value).join("");
  const isSubmitDisabled = paused || selectedSlots.some((l) => l === null) || status !== "idle";

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    const isCorrect = currentGuess === currentWord.correctWord;
    setStatus(isCorrect ? "success" : "error");
    setLastWrongWord(isCorrect ? null : currentWord.correctWord);
    if (isCorrect) onScoreChange?.((prev) => prev + 10);

    setTimeout(() => {
      setStatus("idle");
      if (currentWordIndex + 1 < words.length) {
        setCurrentWordIndex((i) => i + 1);
      } else {
        onGameOver?.();
        restartGame()
      }
    }, 2000);
  };

  const restartGame = async () => {
    setIsRestarting(true); 
    setStatus("idle");
    setCurrentWordIndex(0);
    setWords([]); 
    setLastWrongWord(null);
    const newData = await refetch(); 
    if (!newData?.data) return;    
    const wordsFromApi: LetterChaosItemSingle[] = newData.data.data.data.words || [];
    if (wordsFromApi.length) {
      setWords(wordsFromApi);
      setIsRestarting(false);
    };
  };
  
  if (isLoading||isRestarting) return <p className="text-center mt-10">Loading...</p>;
  if (isError || (words.length === 0 && !isRestarting)) return <p className="text-center mt-10">No words available.</p>;
  return (
    <div className="letter-chaos-game text-center max-w-lg mx-auto font-sans p-4 bg-white shadow-xl rounded-xl">
      <h3 className="text-xl font-semibold mb-6 text-slate-900">
        Word {currentWordIndex + 1} of {words.length}
      </h3>

      {/* לוח ניחוש */}
      <div className="letter-chaos__board ">
        {selectedSlots.map((slot, index) => (
          <motion.div
            key={slot?.id ?? index}//אם ל-סלוט יש אי-די קח אותו אם אין לו קח את האינדקס
            className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-lg border-2 cursor-pointer select-none ${status === "success" ? "bg-emerald-100 text-emerald-800 border-emerald-500": status === "error" ? "bg-red-100 text-red-800 border-red-500": slot ? "bg-white text-slate-900 border-slate-700": "bg-gray-200 text-gray-500 border-gray-400"} letter-pop`}
            onDrop={(e) => handleDrop(e, index)}//מטפל בהכנסת אות לתיבה
            onDragOver={(e) => e.preventDefault()}//חיב להיות כדי שלמעלה יעבוד, מונע רינדור
            onClick={() => slot && handleDeselectItem(slot, index)}//אם יש אות בתיבה מאפשר להסיר אותה
            initial={false}//אנימציה
            animate={{ scale: 1, opacity: 1 }}//אנימציה
            transition={{ duration: 0.2 }}//אנימציה
          >
            {slot?.value}  {/* מציג את האות */}
          </motion.div>
        ))}
      </div>

      {/* מגירת אותיות */}
      <motion.div className="letter-chaos__drawer">
        <AnimatePresence>
          {availableItems.map(item => {
            const isDragged = draggedItem?.id === item.id;//בודק אם האות האת נגררת מחזיר - אמת או שקר
            return (
              <motion.button
                key={item.id}
                className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-lg border-2 transition-transform duration-200 ${isDragged ? "scale-110 shadow-lg border-indigo-400 bg-indigo-100" : "bg-white text-indigo-700 border-indigo-500"} ${paused ? "cursor-not-allowed" : "cursor-grab"} letter-pop`}
                draggable={!paused}// האם ניתן לגרור את הכפתור
                disabled={paused}// אם המשחקpaused, הכפתור לא פעיל
                onClick={() => handleItemSelect(item)}// לחיצה בוחר את האות
                onDragStart={(e) => handleDragStart(e as any, item)}// התחלת גרירה
                onDragEnd={handleDragEnd}// סיום גרירה
                initial={false}//אנימציה
                animate={{ scale: 1, opacity: 1 }}//אנימציה
                exit={{ scale: 0, opacity: 0 }}//אנימציה
                transition={{ type: "spring", stiffness: 500, damping: 30 }}//אנימציה
              >
                {item.value}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ניחוש נוכחי */}
      <p className="mb-4 text-lg text-slate-900">
        Your guess: <strong>{currentGuess}</strong>
      </p>

      {/* התוצאה הנכונה במקרה של שיגאה*/}
      <p className="mb-2 text-lg text-red-600">
        {status === "error" && lastWrongWord && (
          <>The correct word was: <strong>{lastWrongWord}</strong></>
        )}
      </p>
      {/* כפתור שליחה */}
      <button
        className={`w-full py-3 rounded-lg text-white font-bold transition-colors duration-300
          ${isSubmitDisabled && status === "idle" ? "bg-gray-400 cursor-not-allowed"
            : status === "success" ? "bg-green-600 hover:bg-green-700"
            : status === "error" ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"}`}
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
      >
        {status === "success" ? "CORRECT! 🎉" : status === "error" ? "WRONG! ❌" : "Submit"}
      </button>
    </div>
  );
}