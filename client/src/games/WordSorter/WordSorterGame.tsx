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
// 'use client';

// import { useState } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { getCategoryIcon } from "./categoryIcons";
// import { useWordSorterRounds, WordSorterRound } from "./useWordSorterRounds";

// export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [completed, setCompleted] = useState(false);

//   const { rounds, loading } = useWordSorterRounds(7); // 7 = gameId שלך

//   // אם הנתונים עדיין טוענים או המערך ריק, מונעים רינדור מוקדם
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

//       if (next < rounds.length) {
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
//         כל המילים סודרו! 🎉 ניקוד סופי: {score} <br />
//         המשחק נגמר לאחר {rounds.length} סיבובים
//       </div>
//     );
//   }

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold mb-4 text-blue-700">
//         בחרי את הקטגוריה עבור המילה:{" "}
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
//               <Icon size={20} />
//               <span>{c}</span>
//             </button>
//           );
//         })}
//       </div>

//       {feedback && <p className="text-lg font-bold mb-2">{feedback}</p>}
//       <p>ניקוד נוכחי: {score}</p>
//     </div>
//   );
// }


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//הקוד ע"י שימוש בקריאת API
//!!!!!!!!!!!!!!!!!!!!!!!
// 'use client';

// import { useState } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { getCategoryIcon } from "./categoryIcons";
// import { useWordSorterRounds, WordSorterRound } from "./useWordSorterRounds";

// export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [completed, setCompleted] = useState(false);

//   const { rounds, loading } = useWordSorterRounds(7); // gameId

//   if (loading) return <div className="text-green-600">Loading rounds...</div>;
//   if (!rounds.length) return <div className="text-green-600">No rounds available.</div>;

//   const round: WordSorterRound = rounds[roundIndex];

//   const handleSelect = (i: number) => {
//     if (paused || completed) return;

//     const correct = i === round.correctIndex;

//     if (correct) {
//       setFeedback("✔ נכון!");
//       // נעדכן את הניקוד הכולל דרך GameLayout בלבד
//       onScoreChange?.((prev) => prev + 10);
//     } else {
//       setFeedback("❌ שגוי!");
//     }

//     setTimeout(() => {
//       setFeedback("");
//       const next = roundIndex + 1;
//       if (next < rounds.length) {
//         setRoundIndex(next);
//       } else {
//         setCompleted(true);
//         onGameOver?.();
//       }
//     }, 600);
//   };

//   if (completed) {
//     return (
//       <div className="text-center text-green-600 font-bold text-xl">
//         All words completed! 🎉<br />
//         Great job!
//       </div>
//     );
//   }

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold mb-4 text-blue-700">
//         Select the correct category for the word:{" "}
//         <span className="text-lg font-bold text-blue">{round.wordText}</span>
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
//               <Icon size={20} />
//               <span>{c}</span>
//             </button>
//           );
//         })}
//       </div>

//       {feedback && <p className="text-lg font-bold mb-2">{feedback}</p>}
//     </div>
//   );
// }
//*************** */
// 'use client';

// import { useState, useEffect } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { getCategoryIcon } from "./categoryIcons";
// import { WordSorterRound } from "./useWordSorterRounds";
// import { motion, AnimatePresence } from "framer-motion";

// export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [rounds, setRounds] = useState<WordSorterRound[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [feedback, setFeedback] = useState<string | null>(null);
//   const [completed, setCompleted] = useState(false);

//   const mockRounds: WordSorterRound[] = [
//     { wordText: "apple", categories: ["emotions", "clothes", "fruits", "animals"], correctIndex: 2 },
//     { wordText: "banana", categories: ["clothes", "emotions", "numbers", "fruits"], correctIndex: 3 },
//     { wordText: "orange", categories: ["fruits", "animals", "clothes", "countries"], correctIndex: 0 },
//     { wordText: "grape", categories: ["fruits", "colors", "numbers", "clothes"], correctIndex: 0 },
//     { wordText: "mango", categories: ["stationery", "fruits", "colors", "transport"], correctIndex: 1 },
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setRounds(mockRounds);
//       setLoading(false);
//     }, 200);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) return <div className="text-green-600">Loading rounds...</div>;
//   if (!rounds.length) return <div className="text-green-600">No rounds available.</div>;

//   const round = rounds[roundIndex];

//   const handleSelect = (i: number) => {
//     if (paused || completed || selectedIndex !== null) return;

//     setSelectedIndex(i);

//     const correct = i === round.correctIndex;
//     setFeedback(correct ? "correct" : "wrong");

//     if (correct) onScoreChange?.((prev) => prev + 10);

//     setTimeout(() => {
//       setFeedback(null);
//       setSelectedIndex(null);
//       const next = roundIndex + 1;
//       if (next < rounds.length) {
//         setRoundIndex(next);
//       } else {
//         setCompleted(true);
//         onGameOver?.();
//       }
//     }, 1000);
//   };

//   if (completed) {
//     return (
//       <div className="text-center text-green-600 font-bold text-2xl">
//         🎉 All words completed!<br />Great job!
//       </div>
//     );
//   }

//   return (
//     <div className="text-center relative">
//       <h3 className="text-2xl font-semibold mb-6 text-blue-700">
//         Select the correct category for the word:{" "}
//         <span className="text-3xl font-bold text-blue">{round.wordText}</span>
//       </h3>

//       <div className="grid md:grid-cols-2 gap-4 mb-6">
//         {round.categories.map((c, i) => {
//           const Icon = getCategoryIcon(c);

//           let bgColor = "bg-blue-500 hover:bg-blue-600";
//           if (selectedIndex !== null) {
//             if (i === selectedIndex) bgColor = i === round.correctIndex ? "bg-green-500" : "bg-red-500";
//             if (i === round.correctIndex && i !== selectedIndex) bgColor = "bg-green-500/70";
//           }

//           return (
//             <motion.button
//               key={i}
//               onClick={() => handleSelect(i)}
//               disabled={paused || selectedIndex !== null}
//               className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all ${bgColor}`}
//               whileTap={{ scale: 0.9 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <Icon size={24} />
//               <span>{c}</span>
//             </motion.button>
//           );
//         })}
//       </div>

//       <AnimatePresence>
//         {feedback && (
//           <motion.div
//             initial={{ opacity: 0, y: -20, scale: 0.8 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20, scale: 0.8 }}
//             className={`absolute left-1/2 transform -translate-x-1/2 top-0 text-4xl font-bold ${
//               feedback === "correct" ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {feedback === "correct" ? "✔ CORRECT!" : "❌ WRONG!"}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameProps } from "@/components/common/GameLayout";
//import { WordSorterRound } from "./useWordSorterRounds";
import { getCategoryIcon } from "./categoryIcons";
// import { useGameData } from "../hooks/useGameData";
import { useGameData } from "@/hooks/useGameData";
import { GameId } from "@/types";

type WordSorterRound = {
  wordText: string;
  categories: string[];
  correctIndex: number;
};

export default function WordSorterGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId: GameId = 7;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  const [rounds, setRounds] = useState<WordSorterRound[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  // קריאת שרת באמצעות React Query
  //const { data, isLoading } = useGameData(7);

  useEffect(() => {
   // console.log("DATA FROM SERVER:", data);

    // נתוני הסבב נמצאים ב: data.data.data
    const roundData = data?.data?.data;
    if (roundData) {
      // setRounds([roundData]); // עכשיו rounds יקבל את הסבב
      const roundsArray: WordSorterRound[] = Array(5).fill(roundData);
      setRounds(roundsArray);
    }
  }, [data]);

  if (isLoading) return <div className="text-green-600">Loading rounds...</div>;
  if (!rounds.length) return <div className="text-green-600">No rounds available.</div>;

  const round = rounds[roundIndex];

  // const handleSelect = (i: number) => {
  //   if (paused || completed || selectedIndex !== null) return;

  //   setSelectedIndex(i);

  //   const correct = i === round.correctIndex;
  //   setFeedback(correct ? "correct" : "wrong");

  //   if (correct) onScoreChange?.((prev) => prev + 10);

  //   setTimeout(() => {
  //     setFeedback(null);
  //     setSelectedIndex(null);
  //     const next = roundIndex + 1;
  //     if (next < rounds.length) {
  //       setRoundIndex(next);
  //     } else {
  //       setCompleted(true);
  //       onGameOver?.();
  //     }
  //   }, 1000);
  // };
  const handleSelect = (i: number) => {
    if (paused || completed || selectedIndex !== null) return;
  
    setSelectedIndex(i);
  
    const correct = i === round.correctIndex;
    setFeedback(correct ? "correct" : "wrong");
  
    if (correct) onScoreChange?.((prev) => prev + 10);
  
    setTimeout(async () => {
      setFeedback(null);
      setSelectedIndex(null);
  
      const next = roundIndex + 1;
      if (next < rounds.length) {
        setRoundIndex(next);
  
        // כאן אפשר לשלוח בקשה חדשה לשרת אם רוצים נתון חדש
        await refetch();
      } else {
        setCompleted(true);
        onGameOver?.();
      }
    }, 1000);
  };
  
  if (completed) {
    return (
      <div className="text-center text-green-600 font-bold text-2xl">
        🎉 All words completed!<br />Great job!
      </div>
    );
  }

  return (
    <div className="text-center relative">
      <h3 className="text-2xl font-semibold mb-6 text-blue-700">
        Select the correct category for the word:{" "}
        <span className="text-3xl font-bold text-blue">{round.wordText}</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {round.categories.map((c, i) => {
          const Icon = getCategoryIcon(c);

          let bgColor = "bg-blue-500 hover:bg-blue-600";
          if (selectedIndex !== null) {
            if (i === selectedIndex) bgColor = i === round.correctIndex ? "bg-green-500" : "bg-red-500";
            if (i === round.correctIndex && i !== selectedIndex) bgColor = "bg-green-500/70";
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={paused || selectedIndex !== null}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all ${bgColor}`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={24} />
              <span>{c}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className={`absolute left-1/2 transform -translate-x-1/2 top-0 text-4xl font-bold ${feedback === "correct" ? "text-green-500" : "text-red-500"
              }`}
          >
            {feedback === "correct" ? "✔ CORRECT!" : "❌ WRONG!"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
