"use client";
import { useState, useEffect, useRef } from "react";
import MiniWordle from "./mini-wordle/MiniWordle";
import { GameProps } from "@/components/common/GameLayout";
import { useGameData } from "@/hooks/useGameData";
import { GameId } from "@/types";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { useSelector } from "react-redux";

interface MiniWordleModel {
    targetWord: string;
    wordLength: number;
    id: number | null;
}

export default function MiniWordleGame({ onScoreChange, onGameOver, paused, time }: GameProps) {
    const gameId: GameId = 6;
    const { data, isLoading, isError, refetch } = useGameData(gameId);
    const submitProgressMutation = useSubmitProgress();
    const [miniWordleModel, setMiniWordleModel] = useState<MiniWordleModel | null>(null);
    const [loadingWord, setLoadingWord] = useState(false);
    const hasFetchedRef = useRef(false);
    const score = useRef(0);
    const round = useRef(1);
    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        if (!data || hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        const wordData = data.data?.data;
        if (wordData) {
            setMiniWordleModel({
                targetWord: wordData.targetWord,
                wordLength: wordData.wordLength,
                id: wordData.id ?? null
            });
            console.log("Fetched MiniWordle data:", wordData);
        }
    }, [data]);

    const loadNewWord = async () => {
        setLoadingWord(true);
        hasFetchedRef.current = false;
        const newData = await refetch();
        const wordData = newData?.data?.data?.data;
        if (wordData) {
            setMiniWordleModel({
                targetWord: wordData.targetWord,
                wordLength: wordData.wordLength,
                id: wordData.id ?? null
            });
        }
        setLoadingWord(false);
    };

    const handleScoreChange = (roundScore: number) => {
        onScoreChange?.(prev => {
            const newScore = prev + roundScore;
            score.current = newScore;
            return newScore;
        });
    };

    const handleGameOver = async () => {
        const saveTime = time;
        onGameOver?.();

        submitProgressMutation.mutate({
            gameID: gameId,
            userID: user?.userId!,
            score: score.current,
            time: saveTime ?? 0,
            rounds: round.current,
        });
        await loadNewWord();
    };

    const handleWin = async () => {
        round.current += 1;
        await loadNewWord();
    };

    if (isLoading || loadingWord) return <p>Loading...</p>;
    if (isError) return <p>Failed to load data.</p>;
    if (!miniWordleModel) return <p>No data available.</p>;

    return (
        <MiniWordle
            wordLength={miniWordleModel.wordLength}
            targetWord={miniWordleModel.targetWord}
            paused={paused}
            onScoreChange={handleScoreChange}
            onGameOver={handleGameOver}
            OnWin={handleWin}
        />
    );
}
