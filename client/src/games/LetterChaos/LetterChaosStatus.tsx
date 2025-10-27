interface LetterChaosStatusProps {
  currentGuess: string;
  status: "idle" | "success" | "error";
  lastWrongWord: string | null;
}

export default function LetterChaosStatus({
  currentGuess,
  status,
  lastWrongWord,
}: LetterChaosStatusProps) {
  return (
    <>
      <p className="mb-4 text-lg text-white">
        Your guess: <strong>{currentGuess}</strong>
      </p>

      <p className="mb-2 text-lg text-red-400">
        {status === "error" && lastWrongWord && (
          <>
            The correct word was: <strong>{lastWrongWord}</strong>
          </>
        )}
      </p>
    </>
  );
}
