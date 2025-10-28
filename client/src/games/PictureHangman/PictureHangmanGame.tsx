"use client";
import { GameProps } from "@/components/common/GameLayout";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_IMAGE_URL } from "@/lib/constants";
import { useGameData } from "@/hooks/useGameData";
import { WordDisplay } from "./WordDisplay";
import MaskedImage from "./MaskedImage";
import Keyboard from "./Keyboard";
import MistakesList from "./MistakesList";
import GameResult from "./GameResult";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { useSelector } from "react-redux";

export default function PictureHangmanGame({ onScoreChange, onGameOver, paused, time }: GameProps) {
    const { data, isLoading } = useGameData(2);
    const submitProgressMatution = useSubmitProgress();
    const user = useSelector((state: any) => state.user.user);
    const timeRef = useRef(time);

    useEffect(() => {
        timeRef.current = time;
    }, [time]);

    const TOTAL_PIECES = 100;
    const TOTAL_MISTAKES = 10;

    // Game Mode
    const [currentIndex, setCurrentIndex] = useState(0);
    const [guessed, setGuessed] = useState<string[]>([]);
    const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
    const [mistakesCount, setMistakesCount] = useState(0); // Global Mistakes
    const [roundMistakes, setRoundMistakes] = useState(0); // Round Mistakes
    const [usedLetters, setUsedLetters] = useState<string[]>([]); // Round - Used Letters
    const [letterStatus, setLetterStatus] = useState<Record<string, "correct" | "absent">>({});
    const [showFeedback, setShowFeedback] = useState<{ type: "correct" | "wrong"; letter: string } | null>(null);
    const [roundResult, setRoundResult] = useState<{ success: boolean; message: string } | null>(null);
    const [showFullImage, setShowFullImage] = useState(false);
    const [gameOverShown, setGameOverShown] = useState(false);
    const [showGameResult, setShowGameResult] = useState(false);
    const [isWinGame, setIsWinGame] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // Get the current word and image for this round (if data is loaded)
    const pairs = data?.data?.data?.pairs ?? [];
    const pair = pairs[currentIndex];
    const word = pair ? pair.targetWord.toUpperCase() : "";
    const imageUrl = pair ? `${BASE_IMAGE_URL}${pair.imageUrl}` : "";

    //
    const baseRevealPerMistake = Math.floor(TOTAL_PIECES / TOTAL_MISTAKES);
    const revealRemainder = TOTAL_PIECES % TOTAL_MISTAKES;

    // 
    const keyboardColors = useMemo(() => {
        const map: Record<string, string> = {};
        Object.entries(letterStatus).forEach(([k, v]) => (map[k] = v === "correct" ? "correct" : "absent"));
        return map;
    }, [letterStatus]);

    // 
    const uniqueWordLetters = useMemo(
        () => Array.from(new Set(word.split("").filter((ch) => ch !== " "))),
        [word]
    );

    // --- HANDLE GUESS ---
    function handleGuess(letterRaw: string) {
        const letter = letterRaw.toUpperCase();
        if (paused || showFullImage) return;
        if (usedLetters.includes(letter)) return;

        // 
        setUsedLetters((prev) => [...prev, letter]);
        setGuessed((prev) => [...prev, letter]);

        // 
        if (word.includes(letter)) {
            setLetterStatus((prev) => ({ ...prev, [letter]: "correct" }));
            onScoreChange?.((s) => s + 20);

            setShowFeedback({ type: "correct", letter });
            setTimeout(() => setShowFeedback(null), 800);

            const allGuessed = uniqueWordLetters.every(
                (l) => l === letter || guessed.includes(l) || usedLetters.includes(l)
            );
            if (allGuessed) {
                onScoreChange?.((s) => s + 50);
                setRevealedPieces(Array.from({ length: TOTAL_PIECES }, (_, i) => i));
                setShowFullImage(true);
                setRoundResult({ success: true, message: "Round Completed!" });

                setTimeout(() => {
                    setRoundResult(null);
                    proceedToNextRound();
                }, 1800);
            }
        } else {
            // Mistake
            onScoreChange?.((s) => s - 5);
            setLetterStatus((prev) => ({ ...prev, [letter]: "absent" }));
            setShowFeedback({ type: "wrong", letter });
            setTimeout(() => setShowFeedback(null), 800);

            const newMistakesTotal = mistakesCount + 1;
            const newRoundMistakes = roundMistakes + 1;
            setMistakesCount(newMistakesTotal);
            setRoundMistakes(newRoundMistakes);

            const isLastMistake = newMistakesTotal === TOTAL_MISTAKES;
            const revealCount = baseRevealPerMistake + (isLastMistake ? revealRemainder : 0);

            const hiddenIndices = Array.from({ length: TOTAL_PIECES }, (_, i) => i).filter(
                (i) => !revealedPieces.includes(i)
            );
            const newPieces = [...revealedPieces];
            for (let i = 0; i < revealCount; i++) {
                if (hiddenIndices.length === 0) break;
                const randomIndex =
                    hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
                newPieces.push(randomIndex);
                hiddenIndices.splice(hiddenIndices.indexOf(randomIndex), 1);
            }
            setRevealedPieces(newPieces);
            // Lose
            if (newMistakesTotal >= TOTAL_MISTAKES) {
                setShowFullImage(true);
                setFinalScore(finalScore); // ניקוד נוכחי
                setIsWinGame(false); // כישלון
                setShowGameResult(true); // להראות פופאפ

                // Send result to the server
                submitProgressMatution.mutate({
                    gameID: 2,
                    userID: user?.userId!,
                    score: finalScore,
                    time: timeRef.current ?? 0,
                    rounds: pairs.length
                });

                setTimeout(() => onGameOver?.(), 6000);
            }

        }
    }

    // --- מעבר סיבוב ---
    function proceedToNextRound() {
        const next = currentIndex + 1;
        if (next >= pairs.length) {
            const unusedMistakes = Math.max(0, TOTAL_MISTAKES - mistakesCount);
            let final = 0;
            if (unusedMistakes > 0) {
                onScoreChange?.((s) => {
                    final = s + unusedMistakes * 10;
                    return final;
                });
            } else {
                final = 0;
            }

            setFinalScore(final);
            setIsWinGame(true); // ניצחון
            setShowGameResult(true); // להראות פופאפ
            setShowFullImage(true);

            // Send result to the server
            submitProgressMatution.mutate({
                gameID: 2,
                userID: user?.userId!,
                score: final,
                time: timeRef.current ?? 0,
                rounds: pairs.length
            });

            setTimeout(() => {
                onGameOver?.();
            }, 6000);
            return;
        }


        setCurrentIndex(next);
        setGuessed([]);
        setRevealedPieces([]);
        setRoundMistakes(0);
        setUsedLetters([]);
        setLetterStatus({});
        setShowFullImage(false);
    }

    function handleNextWordButtonClicked() {
        setRoundResult(null);
        proceedToNextRound();
    }

    // 
    if (isLoading || !data) {
        return (
            <div className="page-container text-center flex gap-4">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="page-container text-center flex gap-4">
            {/* ---- עמודת המשחק (מרכז) ---- */}
            <div style={{ flex: 1 }}>
                <h2 className="text-xl mb-4">Guess the Word!</h2>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <MaskedImage
                        imageUrl={imageUrl}
                        totalPieces={TOTAL_PIECES}
                        revealedPieces={revealedPieces}
                    />
                </div>

                <WordDisplay word={word} guessed={guessed} showFullWord={showFullImage} />

                <div style={{ height: 40, marginTop: 8 }}>
                    <AnimatePresence>
                        {showFeedback && (
                            <motion.div
                                initial={{ y: -10, opacity: 0, scale: 0.8 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -10, opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.25 }}
                                className={`inline-block px-3 py-1 rounded-lg font-bold ${showFeedback.type === "correct"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-red-500 text-white"
                                    }`}
                            >
                                {showFeedback.type === "correct"
                                    ? `Correct! (${showFeedback.letter})`
                                    : `Wrong! (${showFeedback.letter})`}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ height: 48, marginTop: 6 }}>
                    <AnimatePresence>
                        {roundResult && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`inline-block px-4 py-2 rounded-md font-bold ${roundResult.success
                                    ? "bg-emerald-600 text-white"
                                    : "bg-red-600 text-white"
                                    }`}
                            >
                                {roundResult.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ marginTop: 18 }}>
                    <Keyboard
                        keyboardColors={keyboardColors}
                        onType={handleGuess}
                        onDelete={() => { }}
                        onSubmit={() => { }}
                        usedLetters={usedLetters}
                        disabled={showFullImage || gameOverShown}
                    />
                </div>
            </div>

            {/* ---- עמודת טעויות מצד ימין ---- */}
            <div style={{ width: 220 }}>
                <MistakesList
                    mistakesCount={mistakesCount}
                    totalMistakes={TOTAL_MISTAKES}
                    wrongLetters={Object.keys(letterStatus).filter(
                        (k) => letterStatus[k] === "absent"
                    )}
                />
            </div>
            {
                showGameResult &&
                <GameResult
                    isWin={isWinGame}
                    score={finalScore}
                />
            }
        </div>
    );
}