"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDragAndDrop, DraggableItem } from "@/hooks/useDragAndDrop";
import { useGameData } from "@/hooks/useGameData";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";

import { GameProps } from "@/components/common/GameLayout";
import ProgressBar from "@/components/hud/progressBar";
import LetterChaosBoard from "./LetterChaos/LetterChaosBoard";
import LetterChaosDrawer from "./LetterChaos/LetterChaosDrawer";
import LetterChaosStatus from "./LetterChaos/LetterChaosStatus";
import SubmitButton from "./LetterChaos/SubmitButton";

import { GameId } from "@/types";
import { LetterChaosItemSingle } from "@/types/gamesTypes/LetterChaos";

const generateId = () => Math.floor(Math.random() * 10000).toString();

export default function LetterChaosGame({ onScoreChange, onGameOver, paused, time}: GameProps) {
  const gameId: GameId = 3;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  console.log(data)//להסיר

  const submitProgressMutation = useSubmitProgress();
  const timeRef = useRef(time);
  const user = useSelector((state: any) => state.user.user);
  
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSound.current = new Audio("/sounds/צליל הצלחה.mp3");
    wrongSound.current = new Audio("/sounds/צליל שגיאה.mp3");
    clickSound.current = new Audio("/audio/click.mp3");
  }, []);

  const [words, setWords] = useState<LetterChaosItemSingle[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastWrongWord, setLastWrongWord] = useState<string | null>(null);
  const [isRestarting, setIsRestarting] = useState(false);

  const score = useRef(0);

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

  const { availableItems, selectedSlots, draggedItem,//מחזיר
    handleDragStart, handleDragEnd, handleDrop, handleItemSelect, handleDeselectItem } =useDragAndDrop<DraggableItem>(initialLetters, currentWord?.correctWord?.length ?? 0, paused || status !== "idle", status);

  const currentGuess = selectedSlots.filter((l) => l !== null).map((l) => l!.value).join("");
  const isSubmitDisabled = paused || selectedSlots.some((l) => l === null) || status !== "idle";
  const progress = ((currentWordIndex + 1) / words.length) * 100;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    if (clickSound.current)
    {
      clickSound.current.pause();
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }

    const isCorrect = currentGuess === currentWord.correctWord;
    setStatus(isCorrect ? "success" : "error");
    setLastWrongWord(isCorrect ? null : currentWord.correctWord);

   if (isCorrect && correctSound.current) {
      correctSound.current.pause();
      correctSound.current.currentTime = 0;
      correctSound.current.play();
      score.current += 10;
      onScoreChange?.((prev) => prev + 10);
    } else if (!isCorrect && wrongSound.current) {
      wrongSound.current.pause();
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();
    }

    setTimeout(() => {
      setStatus("idle");
      if (currentWordIndex + 1 < words.length) {
        setCurrentWordIndex((i) => i + 1);
      } else {
        submitProgressMutation.mutate({
          gameID: gameId,
          userID: user?.userId!,
          score: score.current,
          time: timeRef.current ?? 0,
          rounds: currentWordIndex + 1,
        });
        onGameOver?.();
        restartGame()
      }
    }, 2000);
  };

  const restartGame = async () => {
    setIsRestarting(true); 
    setWords([]); 
    setCurrentWordIndex(0);
    setStatus("idle");
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
  <div className="letter-chaos-game text-center max-w-xl mx-auto font-sans p-4  shadow-xl rounded-xl">
      <h3 className="text-xl font-semibold mb-6 text-white">
        Word {currentWordIndex + 1} of {words.length}
      </h3>

      <ProgressBar progress={progress} /> 
      <br/>

      <LetterChaosBoard
        selectedSlots={selectedSlots}
        status={status}
        handleDrop={handleDrop}
        handleDeselectItem={handleDeselectItem}
      />

      <LetterChaosDrawer
        availableItems={availableItems}
        draggedItem={draggedItem}
        paused={false}
        handleItemSelect={handleItemSelect}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />

      <LetterChaosStatus
        currentGuess={currentGuess}
        status={status}
        lastWrongWord={lastWrongWord}
      />

      <SubmitButton
        isSubmitDisabled={isSubmitDisabled}
        status={status}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}