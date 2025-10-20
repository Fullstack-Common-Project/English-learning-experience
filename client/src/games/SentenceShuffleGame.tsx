
// "use client";
// import { useState, useEffect } from "react";
// import { GameProps } from "@/components/common/GameLayout";

// type Sentence = {
//   id: number;
//   text: string;
// };

// const demoSentences: Sentence[] = [
//   { id: 1, text: "The quick brown fox" },
//   { id: 2, text: "jumps over the lazy dog" },
//   { id: 3, text: "Hello world!" },
// ];

// export default function SentenceShuffleGame({ onScoreChange, onGameOver }: GameProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [shuffledWords, setShuffledWords] = useState<string[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
//   const [completed, setCompleted] = useState(false);

//   useEffect(() => {
//     if (demoSentences[currentIndex]) {
//       const words = demoSentences[currentIndex].text.split(" ");
//       setShuffledWords(shuffleArray(words));
//       setSelectedOrder([]);
//     }
//   }, [currentIndex]);

//   const shuffleArray = (arr: string[]) => {
//     return [...arr].sort(() => Math.random() - 0.5);
//   };

//   const handleSelectWord = (word: string) => {
//     setSelectedOrder(prev => [...prev, word]);
//   };

//   const handleSubmit = () => {
//     const original = demoSentences[currentIndex].text.split(" ");
//     if (selectedOrder.join(" ") === original.join(" ")) {
//       onScoreChange?.((prev) => prev + 10); // ניקוד +10
//     }

//     if (currentIndex + 1 < demoSentences.length) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCompleted(true);
//       onGameOver?.(); // הזמן יגיע מה־Timer שמנהל ה-GameLayout
//     }
//   };

//   if (completed) return <p className="text-xl font-semibold">משפטים הושלמו!</p>;

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold mb-4">
//         משפט {currentIndex + 1} מתוך {demoSentences.length}
//       </h3>

//       <div className="mb-4 flex flex-wrap justify-center gap-2">
//         {shuffledWords.map(word => (
//           <button
//             key={word + Math.random()}
//             onClick={() => handleSelectWord(word)}
//             className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
//           >
//             {word}
//           </button>
//         ))}
//       </div>

//       <div className="mb-4">
//         <p>סדר נבחר: {selectedOrder.join(" ")}</p>
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition-all"
//       >
//         Submit
//       </button>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";

type Sentence = {
  id: number;
  text: string;
};

const demoSentences: Sentence[] = [
  { id: 1, text: "The quick brown fox" },
  { id: 2, text: "jumps over the lazy dog" },
  { id: 3, text: "Hello world!" },
];

export default function SentenceShuffleGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  // Shuffle words for the current sentence
  useEffect(() => {
    if (demoSentences[currentIndex]) {
      const words = demoSentences[currentIndex].text.split(" ");
      setShuffledWords(shuffleArray(words));
      setSelectedOrder([]);
    }
  }, [currentIndex]);

  const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  const handleSelectWord = (word: string) => {
    if (paused || completed) return; // לא מאפשר לבחור בזמן הפסקה או לאחר סיום
    setSelectedOrder(prev => [...prev, word]);
  };

  const handleSubmit = () => {
    if (paused || completed) return;

    const original = demoSentences[currentIndex].text.split(" ");
    if (selectedOrder.join(" ") === original.join(" ")) {
      // הוספת ניקוד דרך onScoreChange מ-GameLayout
      onScoreChange?.((prev) => prev + 10);
    }

    if (currentIndex + 1 < demoSentences.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      onGameOver?.(); // GameLayout ינהל את הזמן והסיום
    }
  };

  if (completed) {
    return (
      <p className="text-xl font-semibold text-green-600">
        כל המשפטים הושלמו! 👏
      </p>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">
        משפט {currentIndex + 1} מתוך {demoSentences.length}
      </h3>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {shuffledWords.map(word => (
          <button
            key={word + Math.random()}
            onClick={() => handleSelectWord(word)}
            disabled={paused} // כפתורים לא פעילים בזמן Pause
            className={`px-3 py-1 rounded-lg text-white transition-all ${
              paused ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p>סדר נבחר: {selectedOrder.join(" ")}</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={paused}
        className={`px-6 py-3 rounded-xl shadow text-white transition-all ${
          paused ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Submit
      </button>
    </div>
  );
}
