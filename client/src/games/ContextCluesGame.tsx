// "use client";
// import { useState } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { contextCluesMockData } from "../types/contextCluesMockData";
// import { ContextCluesQuestion } from "../types/ContextCluesQuestion";

// export default function ContextCluesGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [completed, setCompleted] = useState(false);

//   const currentQuestion: ContextCluesQuestion = contextCluesMockData[currentIndex];

//   const handleSelectOption = (index: number) => {
//     if (paused || completed || selectedOption !== null) return;

//     setSelectedOption(index);

//     if (index === currentQuestion.correctIndex) {
//       onScoreChange?.((prev) => prev + 10);
//     } else {
//       onScoreChange?.((prev) => prev - 5);
//     }

//     setTimeout(() => {
//       if (currentIndex + 1 < contextCluesMockData.length) {
//         setCurrentIndex(currentIndex + 1);
//         setSelectedOption(null);
//       } else {
//         setCompleted(true);
//         onGameOver?.();
//       }
//     }, 1500);
//   };

//   if (completed) {
//     return (
//       <p className="text-xl font-semibold text-green-600">
//         כל השאלות הושלמו! 👏
//       </p>
//     );
//   }

//   return (
//     <div className="text-center">
//       <h3 className="text-xl font-semibold mb-4 text-blue-400">
//         Question {currentIndex + 1} / {contextCluesMockData.length}
//       </h3>

//       <p className="mb-6 text-lg text-gray-800">{currentQuestion.sentence}</p>

//       <div className="grid grid-cols-2 gap-4 mb-6 text-blue-400">
//         {currentQuestion.options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => handleSelectOption(index)}
//             disabled={paused || selectedOption !== null}
//             className={`px-4 py-2 rounded-lg font-semibold transition-colors
//               ${
//                 selectedOption !== null
//                   ? index === currentQuestion.correctIndex
//                     ? "bg-green-400 text-white"
//                     : index === selectedOption
//                     ? "bg-red-400 text-white"
//                     : "bg-gray-200"
//                   : "bg-gray-100 hover:bg-gray-300"
//               }`}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
//========================================
// "use client";
// import { useState } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { contextCluesMockData } from "../types/contextCluesMockData";
// import { ContextCluesQuestion } from "../types/ContextCluesQuestion";

// export default function ContextCluesGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [completed, setCompleted] = useState(false);

//   const currentQuestion: ContextCluesQuestion = contextCluesMockData[currentIndex];

//   const handleSelectOption = (index: number) => {
//     if (paused || completed || selectedOption !== null) return;

//     setSelectedOption(index);

//     if (index === currentQuestion.correctIndex) {
//       onScoreChange?.((prev) => prev + 10);
//     } else {
//       onScoreChange?.((prev) => prev - 5);
//     }

//     setTimeout(() => {
//       if (currentIndex + 1 < contextCluesMockData.length) {
//         setCurrentIndex(currentIndex + 1);
//         setSelectedOption(null);
//       } else {
//         setCompleted(true);
//         onGameOver?.();
//       }
//     }, 1500);
//   };

//   if (completed) {
//     return (
//       <div className="panel text-center">
//         <p className="text-2xl font-semibold text-green-400">
//           כל השאלות הושלמו! 👏
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="panel text-center max-w-2xl mx-auto">
//       <h3 className="game-card__title text-indigo-400">
//         שאלה {currentIndex + 1} מתוך {contextCluesMockData.length}
//       </h3>

//       <p className="mb-6 text-lg text-slate-200">{currentQuestion.sentence}</p>

//       <div className="grid grid-cols-2 gap-4 mb-6">
//         {currentQuestion.options.map((option, index) => {
//           const isCorrect = index === currentQuestion.correctIndex;
//           const isSelected = index === selectedOption;
//           const showResult = selectedOption !== null;

//           let buttonClass =
//             "btn-secondary font-semibold transition-all duration-200";

//           if (showResult) {
//             if (isCorrect) buttonClass = "btn-primary bg-green-600 hover:bg-green-500";
//             else if (isSelected) buttonClass = "btn-primary bg-red-600 hover:bg-red-500";
//             else buttonClass = "btn-secondary opacity-50";
//           }

//           return (
//             <button
//               key={index}
//               onClick={() => handleSelectOption(index)}
//               disabled={paused || selectedOption !== null}
//               className={buttonClass}
//             >
//               {option}
//             </button>
//           );
        // })}
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GameProps } from "@/components/common/GameLayout";
import { ContextCluesQuestion } from "@/types/ContextCluesQuestion";

export default function ContextCluesGame({
  onScoreChange,
  onGameOver,
  paused,
}: GameProps) {
  const [questions, setQuestions] = useState<ContextCluesQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // שליפת הנתונים מהשרת
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5075/api/v1/GeneralGame/15/data");
        if (!res.ok) throw new Error("Failed to fetch game data");
        const json = await res.json();

        const data = json?.data?.data?.contextCluesList || [];
        setQuestions(data);
      } catch (err) {
        setError("שגיאה בטעינת הנתונים מהשרת");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectOption = (index: number) => {
    if (paused || completed || selectedOption !== null) return;

    setSelectedOption(index);
    const currentQuestion = questions[currentIndex];

    if (index === currentQuestion.correctIndex) {
      onScoreChange?.((prev) => prev + 10);
    } else {
      onScoreChange?.((prev) => prev - 5);
    }

    // השהיה קטנה כדי להראות את התשובה
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setCompleted(true);
        onGameOver?.();
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div className="panel text-center">
        <p className="text-lg text-slate-300">טוען נתונים מהשרת...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel text-center">
        <p className="text-red-400 font-semibold">{error}</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="panel text-center">
        <p className="text-2xl font-semibold text-green-400">
          כל השאלות הושלמו! 👏
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="panel text-center max-w-2xl mx-auto"
    >
      <h3 className="game-card__title text-indigo-400 mb-4">
        שאלה {currentIndex + 1} מתוך {questions.length}
      </h3>

      <p className="mb-6 text-lg text-slate-200">
        {currentQuestion.sentence.replace("___", "_____")}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctIndex;
          const isSelected = index === selectedOption;
          const showResult = selectedOption !== null;

          let buttonClass =
            "btn-secondary font-semibold transition-all duration-200";

          if (showResult) {
            if (isCorrect)
              buttonClass =
                "btn-primary bg-green-600 hover:bg-green-500 shadow-[0_0_15px_3px_rgba(34,197,94,0.7)]";
            else if (isSelected)
              buttonClass =
                "btn-primary bg-red-600 hover:bg-red-500 shadow-[0_0_15px_3px_rgba(239,68,68,0.7)]";
            else buttonClass = "btn-secondary opacity-50";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={paused || selectedOption !== null}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}


//       </div>
//     </div>
//   );
// }
