import GameLayout from "@/components/common/GameLayout";
import PictureHangmanGame from "@/games/PictureHangman/PictureHangmanGame";

export default function PictureHangmanPage() {
    return (
        <GameLayout
            gameTitle="Reveal It! - Picture Hangman">
            <PictureHangmanGame />
        </GameLayout>
    );
}