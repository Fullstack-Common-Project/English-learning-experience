"use client";

type GameOverModalProps = {
    score: number;
    time: number; // milliseconds
    onRestart: () => void;
};

export default function GameOverModal({ score, time, onRestart }: GameOverModalProps) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    console.log("gameover" + time);


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-96 text-center shadow-xl">
                <h2 className="text-3xl font-bold mb-4">🎉 The game end!</h2>
                <p className="text-xl mb-2">Last score: {score}</p>
                <p className="text-lg mb-6">
                    Finish time: {minutes}:{seconds}
                </p>
                <button
                    onClick={onRestart}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition-all"
                >
                    Restart
                </button>
            </div>
        </div>
    );
}
