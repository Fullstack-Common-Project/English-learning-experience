"use-client";
import { useState } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { motion } from "framer-motion";

interface DoubleVisionOption {
    imageUrl: string;
    label: string;
}

interface DoubleVisionData {
    mainWord: string;
    options: DoubleVisionOption[];
    correctIndex: number;
}

const mockData: DoubleVisionData = {
    mainWord: "apple",
    options: [
        { imageUrl: "/mock-data/Apple.jpeg", label: "Apple" },
        { imageUrl: "/mock-data/Orange.jpeg", label: "Orange" },
        { imageUrl: "/mock-data/Pear.jpeg", label: "Pear" },
        { imageUrl: "/mock-data/Banana.jpeg", label: "Banana" },
    ],
    correctIndex: 0,
};


export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleClick = (index: number) => {
        if (paused || selectedIndex !== null) return;
        setSelectedIndex(index);
        const correct = index === mockData.correctIndex;
        setIsCorrect(correct);

        if (correct) onScoreChange?.(10);
        else onScoreChange?.(0);

        setTimeout(() => {
            onGameOver?.();
            setSelectedIndex(null);
            setIsCorrect(null);
        }, 1000);
    };

    return (
        <div className="doublevision">
            <h2 className="doublevision__word">{mockData.mainWord}</h2>
            <div className="doublevision__grid">
                {mockData.options.map((option, idx) => (
                    <motion.img
                        key={idx}
                        src={option.imageUrl}
                        alt={option.label}
                        className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
                            } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        onClick={() => handleClick(idx)}
                    />
                ))}
            </div>
        </div>
    );

}