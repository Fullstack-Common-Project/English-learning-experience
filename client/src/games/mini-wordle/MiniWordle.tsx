"use client";
import { useState, useEffect, useRef } from "react";
import Board from "./Board";
import Keyboard from "@/components/ui/Keyboard";


interface MiniWordleProps {
    wordLength: number;
    targetWord: string;
    maxGuesses?: number;
    paused?: boolean;
    onScoreChange?: (callback: (prev: number) => number) => void;
    onGameOver?: () => void;
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

export default function MiniWordle({ wordLength, targetWord, maxGuesses = 6, paused = false, onScoreChange, onGameOver }: MiniWordleProps) {

    const [board, setBoard] = useState<string[][]>(Array.from({ length: maxGuesses }, () => Array(wordLength).fill("")));
    const [rowColors, setRowColors] = useState<string[][]>(Array.from({ length: maxGuesses }, () => Array(wordLength).fill("empty")));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [keyboardColors, setKeyboardColors] = useState<Record<string, string>>({});
    const [shake, setShake] = useState(false);
    const [revealingRow, setRevealingRow] = useState(-1);
    const [completed, setCompleted] = useState(false);


    const boardRef = useRef(board);
    const currentRowRef = useRef(currentRow);
    const currentColRef = useRef(currentCol);
    const keyboardColorsRef = useRef(keyboardColors);
    const revealingRowRef = useRef(revealingRow);

    useEffect(() => { boardRef.current = board; }, [board]);
    useEffect(() => { currentRowRef.current = currentRow; }, [currentRow]);
    useEffect(() => { currentColRef.current = currentCol; }, [currentCol]);
    useEffect(() => { keyboardColorsRef.current = keyboardColors; }, [keyboardColors]);
    useEffect(() => { revealingRowRef.current = revealingRow; }, [revealingRow]);

    const onType = (letter: string) => {
        if (paused || completed || revealingRowRef.current !== -1) return;
        if (currentColRef.current >= wordLength) return;
        const newBoard = boardRef.current.map(r => [...r]);
        newBoard[currentRowRef.current][currentColRef.current] = letter.toUpperCase();
        setBoard(newBoard);
        setCurrentCol(currentColRef.current + 1);
    };

    const onDelete = () => {
        if (paused || completed || currentColRef.current === 0 || revealingRowRef.current !== -1) return;
        const newBoard = boardRef.current.map(r => [...r]);
        newBoard[currentRowRef.current][currentColRef.current - 1] = "";
        setBoard(newBoard);
        setCurrentCol(currentColRef.current - 1);
    };

    const onSubmit = () => {
        if (paused || completed || revealingRowRef.current !== -1) return;
        if (currentColRef.current < wordLength) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        const guess = boardRef.current[currentRowRef.current];
        const rowColorResult = getRowColors(guess, targetWord);
        setRevealingRow(currentRowRef.current);

   
        let roundScore = 0;
        rowColorResult.forEach(c => {
            if (c === "correct") roundScore += 2;
            else if (c === "present") roundScore += 1;
        });

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

            onScoreChange?.(prev => prev + roundScore);

            if (guess.join("") === targetWord.toUpperCase() || currentRowRef.current + 1 >= maxGuesses) {
                setCompleted(true);
                alert(`Game Over! The word: ${targetWord}`);
                onGameOver?.();
            } else {
                setCurrentRow(currentRowRef.current + 1);
                setCurrentCol(0);
            }
            setRevealingRow(-1);
        }, wordLength * 220 + 300);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            if (key === "ENTER") onSubmit();
            else if (key === "BACKSPACE") onDelete();
            else if (/^[A-Z]$/.test(key)) onType(key);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="mini-wordle flex flex-col items-center mt-6">
            <p className="text-lg font-medium mb-2">
                Guess {currentRow + 1} of {maxGuesses}
            </p>

            <Board board={board} rowColors={rowColors} currentRow={currentRow} shake={shake} revealingRow={revealingRow} />
            <Keyboard onType={onType} onDelete={onDelete} onSubmit={onSubmit} keyboardColors={keyboardColors} disabled={paused || completed || revealingRow !== -1} />

                </div>
    );
}


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Board from "./Board";
// import Keyboard from "../../components/ui/Keyboard";

// interface MiniWordleProps {
//     wordLength: number;
//     targetWord: string;
//     maxGuesses?: number;
//     paused?: boolean;
//     onScoreChange?: (callback: (prev: number) => number) => void;
//     onGameOver?: () => void;
// }

// const getRowColors = (guess: string[], solution: string) => {
//     const colors: string[] = Array(guess.length).fill("absent");
//     const solutionLetters = solution.toUpperCase().split("");

//     guess.forEach((letter, idx) => {
//         if (solutionLetters[idx] === letter) {
//             colors[idx] = "correct";
//             solutionLetters[idx] = "";
//         }
//     });

//     guess.forEach((letter, idx) => {
//         if (colors[idx] === "correct") return;
//         const foundIdx = solutionLetters.indexOf(letter);
//         if (foundIdx !== -1) {
//             colors[idx] = "present";
//             solutionLetters[foundIdx] = "";
//         }
//     });

//     return colors;
// };

// export default function MiniWordle({ wordLength, targetWord, maxGuesses = 6, paused = false, onScoreChange, onGameOver }: MiniWordleProps) {

//     const [board, setBoard] = useState<string[][]>(Array.from({ length: maxGuesses }, () => Array(wordLength).fill("")));
//     const [rowColors, setRowColors] = useState<string[][]>(Array.from({ length: maxGuesses }, () => Array(wordLength).fill("empty")));
//     const [currentRow, setCurrentRow] = useState(0);
//     const [currentCol, setCurrentCol] = useState(0);
//     const [keyboardColors, setKeyboardColors] = useState<Record<string, string>>({});
//     const [shake, setShake] = useState(false);
//     const [revealingRow, setRevealingRow] = useState(-1);
//     const [completed, setCompleted] = useState(false);
//     const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null); 

//     const boardRef = useRef(board);
//     const currentRowRef = useRef(currentRow);
//     const currentColRef = useRef(currentCol);
//     const keyboardColorsRef = useRef(keyboardColors);
//     const revealingRowRef = useRef(revealingRow);

//     useEffect(() => { boardRef.current = board; }, [board]);
//     useEffect(() => { currentRowRef.current = currentRow; }, [currentRow]);
//     useEffect(() => { currentColRef.current = currentCol; }, [currentCol]);
//     useEffect(() => { keyboardColorsRef.current = keyboardColors; }, [keyboardColors]);
//     useEffect(() => { revealingRowRef.current = revealingRow; }, [revealingRow]);

//     const onType = (letter: string) => {
//         if (paused || completed || revealingRowRef.current !== -1) return;
//         if (currentColRef.current >= wordLength) return;
//         const newBoard = boardRef.current.map(r => [...r]);
//         newBoard[currentRowRef.current][currentColRef.current] = letter.toUpperCase();
//         setBoard(newBoard);
//         setCurrentCol(currentColRef.current + 1);
//     };

//     const onDelete = () => {
//         if (paused || completed || currentColRef.current === 0 || revealingRowRef.current !== -1) return;
//         const newBoard = boardRef.current.map(r => [...r]);
//         newBoard[currentRowRef.current][currentColRef.current - 1] = "";
//         setBoard(newBoard);
//         setCurrentCol(currentColRef.current - 1);
//     };

//     const onSubmit = () => {
//         if (paused || completed || revealingRowRef.current !== -1) return;
//         if (currentColRef.current < wordLength) {
//             setShake(true);
//             setTimeout(() => setShake(false), 500);
//             return;
//         }

//         const guess = boardRef.current[currentRowRef.current];
//         const rowColorResult = getRowColors(guess, targetWord);
//         setRevealingRow(currentRowRef.current);

//         let roundScore = 0;
//         rowColorResult.forEach(c => {
//             if (c === "correct") roundScore += 2;
//             else if (c === "present") roundScore += 1;
//         });

//         rowColorResult.forEach((color, idx) => {
//             setTimeout(() => {
//                 setRowColors(prev => {
//                     const updated = prev.map(r => [...r]);
//                     updated[currentRowRef.current][idx] = color;
//                     return updated;
//                 });
//             }, idx * 200);
//         });

//         setTimeout(() => {
//             const newKeyboardColors = { ...keyboardColorsRef.current };
//             guess.forEach((letter, idx) => {
//                 const c = rowColorResult[idx];
//                 if (!newKeyboardColors[letter] || c === "correct" || (c === "present" && newKeyboardColors[letter] !== "correct")) {
//                     newKeyboardColors[letter] = c;
//                 }
//             });
//             setKeyboardColors(newKeyboardColors);

//             onScoreChange?.(prev => prev + roundScore);

//             if (guess.join("") === targetWord.toUpperCase()) {
//                 setFeedback("correct"); 
//                 setCompleted(true);
//                 setTimeout(() => {
//                     setFeedback(null);
//                     onGameOver?.();
//                 }, 1200);
//             } else if (currentRowRef.current + 1 >= maxGuesses) {
//                 setFeedback("wrong"); 
//                 setCompleted(true);
//                 setTimeout(() => {
//                     setFeedback(null);
//                     alert(`Game Over! The word: ${targetWord}`);
//                     onGameOver?.();
//                 }, 1200);
//             } else {
//                 // לא נגמר המשחק
//                 setFeedback(rowColorResult.every(c => c === "absent") ? "wrong" : null);
//                 setTimeout(() => setFeedback(null), 800);
//                 setCurrentRow(currentRowRef.current + 1);
//                 setCurrentCol(0);
//             }

//             setRevealingRow(-1);
//         }, wordLength * 220 + 300);
//     };

//     useEffect(() => {
//         const handleKey = (e: KeyboardEvent) => {
//             const key = e.key.toUpperCase();
//             if (key === "ENTER") onSubmit();
//             else if (key === "BACKSPACE") onDelete();
//             else if (/^[A-Z]$/.test(key)) onType(key);
//         };
//         window.addEventListener("keydown", handleKey);
//         return () => window.removeEventListener("keydown", handleKey);
//     }, []);

//     return (
//         <div className="mini-wordle flex flex-col items-center mt-6 relative">
//             <p className="text-lg font-medium mb-2">
//                 Guess {currentRow + 1} of {maxGuesses}
//             </p>

//             <Board
//                 board={board}
//                 rowColors={rowColors}
//                 currentRow={currentRow}
//                 shake={shake}
//                 revealingRow={revealingRow}
//             />

//             <Keyboard
//                 onType={onType}
//                 onDelete={onDelete}
//                 onSubmit={onSubmit}
//                 keyboardColors={keyboardColors}
//                 disabled={paused || completed || revealingRow !== -1}
//             />

      
//             <AnimatePresence>
//                 {feedback && (
//                     <motion.div
//                         key={feedback}
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         transition={{ duration: 0.3 }}
//                         className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                     >
//                         <div
//                             className={`text-4xl font-extrabold px-6 py-4 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md 
//                             ${feedback === "correct"
//                                 ? "bg-green-600 text-white"
//                                 : "bg-red-600 text-white"}`}
//                         >
//                             {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }
