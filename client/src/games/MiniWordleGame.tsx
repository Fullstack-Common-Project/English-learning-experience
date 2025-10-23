"use client";
import { useState, useEffect, useRef } from "react";
import MiniWordle from "./mini-wordle/MiniWordle";
import { GameProps } from "@/components/common/GameLayout";
import { useGameData } from "@/hooks/useGameData";
import { GameId } from "@/types";
import { useRouter } from "next/navigation";

interface MiniWordleModel {
    targetWord: string;
    wordLength: number;
    id: number | null;
}

export default function MiniWordleGame({ onScoreChange, onGameOver, paused }: GameProps) {
    const gameId: GameId = 6;
    const { data, isLoading, isError, refetch } = useGameData(gameId);
    const [miniWordleModel, setMiniWordleModel] = useState<MiniWordleModel | null>(null);
    const hasFetchedRef = useRef(false);
    // const router = useRouter();



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
        }
    }, [data]);

    //     useEffect(() => {
    //     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    //     if (!token) {
    //         router.push("/login"); // מפנה לעמוד התחברות
    //         return;
    //     }

    //     if (!data || hasFetchedRef.current) return;
    //     hasFetchedRef.current = true;

    //     const wordData = data.data?.data;
    //     if (wordData) {
    //         setMiniWordleModel({
    //             targetWord: wordData.targetWord,
    //             wordLength: wordData.wordLength,
    //             id: wordData.id ?? null
    //         });
    //     }
    // }, [data, router]);



    const handleGameOver = async () => {
        onGameOver?.();
        const newData = await refetch();
        const wordData = newData?.data?.data?.data;

        if (wordData) {
            setMiniWordleModel({
                targetWord: wordData.targetWord,
                wordLength: wordData.wordLength,
                id: wordData.id ?? null
            });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load data.</p>;
    if (!miniWordleModel) return <p>No data available.</p>;

    return (
        <MiniWordle
            wordLength={miniWordleModel.wordLength}
            targetWord={miniWordleModel.targetWord}
            paused={paused}
            onScoreChange={onScoreChange}
            onGameOver={handleGameOver}
        />
    );
}
