// 'use client';

// import { useState } from "react";
// import { GameProps } from "@/components/common/GameLayout"; // Props שמגיעים מ-GameLayout

// type WordSorterRound = {
//   word: string;
//   categories: string[];
//   correctIndex: number;
// };

// // דמה: אפשר להחליף ב-API או useQuery
// const demoRounds: WordSorterRound[] = [
//   { word: "Apple", categories: ["Fruit", "Animal", "Color", "Country"], correctIndex: 0 },
//   { word: "Tiger", categories: ["Fruit", "Animal", "Color", "Country"], correctIndex: 1 },
//   { word: "Blue", categories: ["Fruit", "Animal", "Color", "Country"], correctIndex: 2 },
// ];

// export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState(""); // Feedback נכון/שגוי
//   const [completed, setCompleted] = useState(false);

//   const round = demoRounds[roundIndex];

//   const handleSelect = (i: number) => {
//     if (paused || completed) return;

//     const correct = i === round.correctIndex;
//     if (correct) {
//       setScore((s) => {
//         const newScore = s + 10;
//         onScoreChange?.(10); // מוסיפים נקודות ל-GameLayout
//         return newScore;
//       });
//       setFeedback("✔ נכון!");
//     } else {
//       setFeedback("❌ שגוי!");
//     }

//     setTimeout(() => {
//       setFeedback("");
//       const next = roundIndex + 1;
//       if (next < demoRounds.length) {
//         setRoundIndex(next);
//       } else {
//         setCompleted(true);
//         onGameOver?.();
//       }
//     }, 500);
//   };

//   if (completed) {
//     return (
//       <div className="text-center text-green-600 font-bold text-xl">
//         כל המילים סודרו! 🎉 ניקוד סופי: {score}
//       </div>
//     );
//   }

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold mb-4 text-blue-400">
//         בחרי את הקטגוריה עבור המילה: <span className="text-lg">{round.word}</span>
//       </h3>

//       <div className="grid md:grid-cols-2 gap-3 mb-4">
//         {round.categories.map((c, i) => (
//           <button
//             key={i}
//             onClick={() => handleSelect(i)}
//             disabled={paused}
//             className={`px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all ${paused ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       {feedback && <p className="text-lg font-bold mb-2">{feedback}</p>}
//       <p>ניקוד נוכחי: {score}</p>
//     </div>
//   );
// }
// 'use client';

// import { useState } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { getCategoryIcon } from "./categoryIcons";
// import { useWordSorterRounds } from "./useWordSorterRounds";


// type WordSorterRound = {
//   word: string;
//   categories: string[];
//   correctIndex: number;
// };

// // נתוני דוגמה — בהמשך תחליפי בנתונים מה-API
// const demoRounds: WordSorterRound[] = [
//   { word: "Apple", categories: ["fruits", "animals", "colors", "countries"], correctIndex: 0 },
//   { word: "Tiger", categories: ["fruits", "animals", "colors", "countries"], correctIndex: 1 },
//   { word: "Blue", categories: ["fruits", "animals", "colors", "countries"], correctIndex: 2 },
// ];

// export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [completed, setCompleted] = useState(false);
//   const { rounds, loading } = useWordSorterRounds(7); // 7 = gameId שלך
//   //const round = demoRounds[roundIndex];

//   if (loading) return <div>Loading rounds...</div>;
//   if (!rounds.length) return <div>No rounds available.</div>;

//   const round: WordSorterRound = rounds[roundIndex];

//   const handleSelect = (i: number) => {
//     if (paused || completed) return;
  
//     const correct = i === round.correctIndex;
  
//     if (correct) {
//       setScore((s) => s + 10);
//       setFeedback("✔ נכון!");
      
//       // עדכון ההורה בצורה אסינכרונית
//       setTimeout(() => {
//         onScoreChange?.(10);
//       }, 0);
//     } else {
//       setFeedback("❌ שגוי!");
//     }
  
//     setTimeout(() => {
//       setFeedback("");
//       const next = roundIndex + 1;
//       if (next < demoRounds.length) {
//         setRoundIndex(next);
//       } else {
//         setCompleted(true);
//         onGameOver?.();
//       }
//     }, 500);
//   };
  
//   if (completed) {
//     return (
//       <div className="text-center text-green-600 font-bold text-xl">
//        All words completed! 🎉 Your final score: {score}
//       </div>
//     );
//   }

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold mb-4 text-blue-700">
//         Select the correct category for the word:{" "}
//         <span className="text-lg font-bold text-blue">{round.word}</span>
//       </h3>

//       <div className="grid md:grid-cols-2 gap-3 mb-4">
//         {round.categories.map((c, i) => {
//           const Icon = getCategoryIcon(c);
//           return (
//             <button
//               key={i}
//               onClick={() => handleSelect(i)}
//               disabled={paused}
//               className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all ${
//                 paused ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {/* אייקון */}
//               <Icon size={20} />
//               {/* שם הקטגוריה */}
//               <span>{c}</span>
//             </button>
//           );
//         })}
//       </div>

//       {feedback && <p className="text-lg font-bold mb-2">{feedback}</p>}
//       <p>Your current score: {score}</p>
//     </div>
//   );
// }
'use client';

import { useState } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { getCategoryIcon } from "./categoryIcons";
import { useWordSorterRounds, WordSorterRound } from "./useWordSorterRounds";

export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const { rounds, loading } = useWordSorterRounds(7); // 7 = gameId שלך

  // אם הנתונים עדיין טוענים או המערך ריק, מונעים רינדור מוקדם
  if (loading) return <div>Loading rounds...</div>;
  if (!rounds.length) return <div>No rounds available.</div>;

  const round: WordSorterRound = rounds[roundIndex];

  const handleSelect = (i: number) => {
    if (paused || completed) return;

    const correct = i === round.correctIndex;

    if (correct) {
      setScore((s) => s + 10);
      setFeedback("✔ נכון!");

      // עדכון ההורה בצורה אסינכרונית
      setTimeout(() => {
        onScoreChange?.(10);
      }, 0);
    } else {
      setFeedback("❌ שגוי!");
    }

    setTimeout(() => {
      setFeedback("");
      const next = roundIndex + 1;

      if (next < rounds.length) {
        setRoundIndex(next);
      } else {
        setCompleted(true);
        onGameOver?.();
      }
    }, 500);
  };

  if (completed) {
    return (
      <div className="text-center text-green-600 font-bold text-xl">
        כל המילים סודרו! 🎉 ניקוד סופי: {score} <br />
        המשחק נגמר לאחר {rounds.length} סיבובים
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">
        בחרי את הקטגוריה עבור המילה:{" "}
        <span className="text-lg font-bold text-blue">{round.word}</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-3 mb-4">
        {round.categories.map((c, i) => {
          const Icon = getCategoryIcon(c);
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={paused}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all ${
                paused ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Icon size={20} />
              <span>{c}</span>
            </button>
          );
        })}
      </div>

      {feedback && <p className="text-lg font-bold mb-2">{feedback}</p>}
      <p>ניקוד נוכחי: {score}</p>
    </div>
  );
}
