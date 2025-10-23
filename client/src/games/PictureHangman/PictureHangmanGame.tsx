"use client";
import { GameProps } from "@/components/common/GameLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { BASE_IMAGE_URL } from "@/lib/constants";

export default function PictureHangmanGame({ onScoreChange, onGameOver, paused }: GameProps) {
    const [word] = useState("APPLE");
    const [guessed, setGuessed] = useState<string[]>([]);
    const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
    const [showFullImage, setShowFullImage] = useState(false);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const imageUrl = `${BASE_IMAGE_URL}Images/Fruits/Apple.jpeg`;
    const totalPieces = 6;

    function handleGuess(letter: string) {
        if (paused || showFullImage) return;
        if (guessed.includes(letter)) return;

        setGuessed([...guessed, letter]);

        if (!word.includes(letter)) {
            onScoreChange?.((s) => s - 5);

            setRevealedPieces((prev) => {
                const allIndices = Array.from({ length: totalPieces }, (_, i) => i);
                const hiddenIndices = allIndices.filter(i => !prev.includes(i));
                if (hiddenIndices.length === 0) return prev;

                const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
                const next = [...prev, randomIndex];

                if (next.length >= totalPieces) {
                    setShowFullImage(true);
                    setTimeout(() => onGameOver?.(), 3000);
                }

                return next;
            });
        } else {
            onScoreChange?.((s) => s + 10);

            const allRevealed = word.split("").every((l) => guessed.concat(letter).includes(l));
            if (allRevealed) {
                onScoreChange?.((s) => s + 50);
                setShowFullImage(true);
                setTimeout(() => onGameOver?.(), 3000);
            }
        }
    }

    const renderMaskPieces = () => {
        const rows = 2;
        const cols = 3;
        const pieces = [];

        for (let i = 0; i < totalPieces; i++) {
            const isHidden = revealedPieces.includes(i) || showFullImage;

            const r = Math.floor(i / cols);
            const c = i % cols;

            pieces.push(
                <motion.div
                    key={i}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: isHidden ? 0 : 1, y: isHidden ? -20 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: "absolute",
                        top: `${(r / rows) * 100}%`,
                        left: `${(c / cols) * 100}%`,
                        width: `${100 / cols}%`,
                        height: `${100 / rows}%`,
                        backgroundColor: "black",
                    }}
                />
            );
        }

        return pieces;
    };

    return (
        <div className="page-container text-center">
            <h2 className="text-xl mb-4">Guess the Word!</h2>

            <div style={{ position: "relative", width: "30vh", margin: "auto", border: "2px solid #ccc" }}>
                <img
                    src={imageUrl}
                    alt="word image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }}
                />
                {renderMaskPieces()}
            </div>

            <div className="text-3xl mb-4 mt-4">
                {word.split("").map((l, i) => (
                    <span key={i}>{showFullImage || guessed.includes(l) ? l : "_ "}</span>
                ))}
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
                {letters.map((l) => (
                    <button
                        key={l}
                        onClick={() => handleGuess(l)}
                        disabled={guessed.includes(l)}
                        className="btn-primary"
                    >
                        {l}
                    </button>
                ))}
            </div>

            <p className="mt-4">Mistakes: {revealedPieces.length}/{totalPieces}</p>
        </div>
    );
}
