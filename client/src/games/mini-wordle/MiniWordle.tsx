"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Board from "./Board";
import Keyboard from "@/components/ui/Keyboard";

interface MiniWordleProps {
    wordLength: number;
    targetWord: string;
    maxGuesses?: number;
    paused?: boolean;
    onScoreChange?: (roundScore: number) => void;
    onGameOver?: () => void;
    onWin?: () => void;
}

const getRowColors = (guess: string[], solution: string) => {
    const colors: string[] = Array(guess.length).fill("absent");
    const solutionLetters = solution.toUpperCase().split("");

    guess.forEach((letter, idx) => {
        if (solutionLetters[idx] === letter) {
            colors[idx] = "correct";
            solutionLetters[idx] = "";
        }
    });

    guess.forEach((letter, idx) => {
        if (colors[idx] === "correct") return;
        const foundIdx = solutionLetters.indexOf(letter);
        if (foundIdx !== -1) {
            colors[idx] = "present";
            solutionLetters[foundIdx] = "";
        }
    });

    return colors;
};

export default function MiniWordle({
    wordLength,
    targetWord,
    maxGuesses = 6,
    paused = false,
    onScoreChange,
    onGameOver,
    onWin,
}: MiniWordleProps) {
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: maxGuesses }, () => Array(wordLength).fill(""))
    );
    const [rowColors, setRowColors] = useState<string[][]>(
        Array.from({ length: maxGuesses }, () => Array(wordLength).fill("empty"))
    );
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [keyboardColors, setKeyboardColors] = useState<Record<string, string>>({});
    const [shake, setShake] = useState(false);
    const [revealingRow, setRevealingRow] = useState(-1);
    const [completed, setCompleted] = useState(false);
    const correctSound = useRef<HTMLAudioElement | null>(null);
    const wrongSound = useRef<HTMLAudioElement | null>(null);
    const gameOverSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        correctSound.current = new Audio("/sounds/צליל הצלחה.mp3");
        wrongSound.current = new Audio("/sounds/צליל שגיאה.mp3");
        gameOverSound.current = new Audio("/audio/wrong.mp3");
    }, []);

    const targetWordRef = useRef(targetWord);
    const boardRef = useRef(board);
    const currentRowRef = useRef(currentRow);
    const currentColRef = useRef(currentCol);
    const keyboardColorsRef = useRef(keyboardColors);
    const revealingRowRef = useRef(revealingRow);

    const updateRef = <T,>(ref: React.RefObject<T>, value: T) => {
        ref.current = value;
    };

    useEffect(() => updateRef(boardRef, board), [board]);
    useEffect(() => updateRef(currentRowRef, currentRow), [currentRow]);
    useEffect(() => updateRef(currentColRef, currentCol), [currentCol]);
    useEffect(() => updateRef(keyboardColorsRef, keyboardColors), [keyboardColors]);
    useEffect(() => updateRef(revealingRowRef, revealingRow), [revealingRow]);

    const resetBoard = (newLength: number) => {
        setBoard(Array.from({ length: maxGuesses }, () => Array(newLength).fill("")));
        setRowColors(Array.from({ length: maxGuesses }, () => Array(newLength).fill("empty")));
        setCurrentRow(0);
        setCurrentCol(0);
        setKeyboardColors({});
        setCompleted(false);
    };

    useEffect(() => {
        targetWordRef.current = targetWord;
        resetBoard(targetWord.length);
    }, [targetWord]);

    const onType = useCallback((letter: string) => {
        if (paused || completed || revealingRowRef.current !== -1) return;
        if (currentColRef.current >= wordLength) return;

        const newBoard = boardRef.current.map(r => [...r]);
        newBoard[currentRowRef.current][currentColRef.current] = letter.toUpperCase();
        setBoard(newBoard);
        setCurrentCol(currentColRef.current + 1);
    }, [paused, completed, wordLength]);

    const onDelete = useCallback(() => {
        if (paused || completed || currentColRef.current === 0 || revealingRowRef.current !== -1) return;

        const newBoard = boardRef.current.map(r => [...r]);
        newBoard[currentRowRef.current][currentColRef.current - 1] = "";
        setBoard(newBoard);
        setCurrentCol(currentColRef.current - 1);
    }, [paused, completed]);

    // const onSubmit = useCallback(() => {
    //     if (paused || completed || revealingRowRef.current !== -1) return;
    //     if (currentColRef.current < wordLength) {
    //         setShake(true);
    //         setTimeout(() => setShake(false), 500);
    //         return;
    //     }

    //     const guess = boardRef.current[currentRowRef.current];
    //     const rowColorResult = getRowColors(guess, targetWordRef.current);
    //     setRevealingRow(currentRowRef.current);

    //     let roundScore = 0;
    //     rowColorResult.forEach(c => {
    //         if (c === "correct") roundScore += 2;
    //         else if (c === "present") roundScore += 1;
    //     });

    //     rowColorResult.forEach((color, idx) => {
    //         setTimeout(() => {
    //             setRowColors(prev => {
    //                 const updated = prev.map(r => [...r]);
    //                 updated[currentRowRef.current][idx] = color;
    //                 return updated;
    //             });
    //         }, idx * 200);
    //     });

    //     setTimeout(() => {
    //         const newKeyboardColors = { ...keyboardColorsRef.current };
    //         guess.forEach((letter, idx) => {
    //             const c = rowColorResult[idx];
    //             if (!newKeyboardColors[letter] || c === "correct" || (c === "present" && newKeyboardColors[letter] !== "correct")) {
    //                 newKeyboardColors[letter] = c;
    //             }
    //         });
    //         setKeyboardColors(newKeyboardColors);

    //         onScoreChange?.(roundScore);
    //         if (guess.join("") === targetWordRef.current.toUpperCase()) {
    //             correctSound.current?.play();
    //             setTimeout(() => {
    //                 setCompleted(true);
    //                 onWin?.();
    //             }, 3000);
    //         }
    //         else if (currentRowRef.current + 1 >= maxGuesses) {
    //             gameOverSound.current?.play();
    //             alert(`Game Over! The word was: ${targetWordRef.current}`);
    //             setCompleted(true);
    //             onGameOver?.();
    //         } else {
    //             wrongSound.current?.play();
    //             setCurrentRow(currentRowRef.current + 1);
    //             setCurrentCol(0);
    //         }

    //         setRevealingRow(-1);
    //     }, wordLength * 220 + 300);
    // }, [paused, completed, wordLength, onScoreChange, onGameOver, onWin]);
    const onSubmit = useCallback(() => {
        if (paused || completed || revealingRowRef.current !== -1) return;
        if (currentColRef.current < wordLength) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        const guess = boardRef.current[currentRowRef.current];
        const rowColorResult = getRowColors(guess, targetWordRef.current);

        // חישוב ניקוד **מיידי**
        let roundScore = 0;
        rowColorResult.forEach(c => {
            if (c === "correct") roundScore += 2;
            else if (c === "present") roundScore += 1;
        });

        // שליחת הניקוד מיידית
        onScoreChange?.(roundScore);

        setRevealingRow(currentRowRef.current);

        // עדכון לוחות צבעים ו־keyboard אחרי האנימציה
        rowColorResult.forEach((color, idx) => {
            setTimeout(() => {
                setRowColors(prev => {
                    const updated = prev.map(r => [...r]);
                    updated[currentRowRef.current][idx] = color;
                    return updated;
                });
            }, idx * 200);
        });

        setTimeout(() => {
            const newKeyboardColors = { ...keyboardColorsRef.current };
            guess.forEach((letter, idx) => {
                const c = rowColorResult[idx];
                if (!newKeyboardColors[letter] || c === "correct" || (c === "present" && newKeyboardColors[letter] !== "correct")) {
                    newKeyboardColors[letter] = c;
                }
            });
            setKeyboardColors(newKeyboardColors);

            if (guess.join("") === targetWordRef.current.toUpperCase()) {
                correctSound.current?.play();
                setTimeout(() => {
                    setCompleted(true);
                    onWin?.();
                }, 3000);
            }
            else if (currentRowRef.current + 1 >= maxGuesses) {
                gameOverSound.current?.play();
                alert(`Game Over! The word was: ${targetWordRef.current}`);
                setCompleted(true);
                onGameOver?.();
            } else {
                wrongSound.current?.play();
                setCurrentRow(currentRowRef.current + 1);
                setCurrentCol(0);
            }

            setRevealingRow(-1);
        }, wordLength * 220 + 300);
    }, [paused, completed, wordLength, onScoreChange, onGameOver, onWin]);


    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            if (key === "ENTER") onSubmit();
            else if (key === "BACKSPACE") onDelete();
            else if (/^[A-Z]$/.test(key)) onType(key);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onType, onDelete, onSubmit]);

    return (
        <div className="mini-wordle flex flex-col items-center mt-6">
            <p className="text-lg font-medium mb-2">
                Guess {currentRow + 1} of {maxGuesses}
            </p>

            <Board
                board={board}
                rowColors={rowColors}
                currentRow={currentRow}
                shake={shake}
                revealingRow={revealingRow}
            />
            <Keyboard
                onType={onType}
                onDelete={onDelete}
                onSubmit={onSubmit}
                keyboardColors={keyboardColors}
                disabled={paused || completed || revealingRow !== -1}
            />
        </div>
    );
}

