interface WordDisplayProps {
    word: string;
    guessed: string[];
    showFullWord: boolean;
}

export function WordDisplay({ word, guessed, showFullWord }: WordDisplayProps) {
    return (
        <div className="text-3xl mb-4 mt-4">
            {word.split("").map((letter, index) => (
                <span key={index}>{showFullWord || guessed.includes(letter) ? letter : "_ "}</span>
            ))}
        </div>
    );
}