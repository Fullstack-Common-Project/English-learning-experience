// "use client";
// import React, { useState, useEffect } from "react";
// import { gm20GetInit, gm20Ask } from "@/lib/api";
// import type {
//   GuessMasterData,
//   GuessMasterAskResponse,
// } from "@/types";

// export default function GuessMaster20Game() {
//   const [data, setData] = useState<GuessMasterData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [question, setQuestion] = useState("");
//   const [log, setLog] = useState<string[]>([]);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await gm20GetInit();
//         setData(res);
//       } catch (err) {
//         console.error("Failed to init GuessMaster20:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // שלב 2 – שליחת שאלה/ניחוש
//   async function handleAsk(isGuess = false) {
//     if (!data) return;

//     try {
//       const body = isGuess
//         ? { sessionId: data.sessionId, isGuess: true, guessWord: question }
//         : { sessionId: data.sessionId, questionText: question };

//       const response: GuessMasterAskResponse = await gm20Ask(body);

//       const message = isGuess
//         ? response.guessCorrect
//           ? `🎉 Correct! The word was guessed.`
//           : `❌ Wrong guess: ${question}`
//         : response.yesNoAnswer === null
//         ? `🤔 No answer.`
//         : response.yesNoAnswer
//         ? `✅ Yes`
//         : `❌ No`;

//       setLog((prev) => [...prev, `Q: ${question}`, `→ ${message}`]);
//       setData({
//         ...data,
//         remainingTurns: response.remainingTurns,
//         suggestedQuestions: response.nextSuggestedQuestions,
//       });

//       if (response.gameOver) {
//         setGameOver(true);
//       }
//     } catch (err) {
//       console.error("Failed to send question:", err);
//     } finally {
//       setQuestion("");
//     }
//   }

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (!data) return <div className="text-center text-red-500">Failed to load game.</div>;

//   return (
//     <div className="flex flex-col items-center gap-4 text-center">
//       <p className="text-lg font-medium mb-2">
//         Remaining turns: {data.remainingTurns}/{data.maxTurns}
//       </p>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask a yes/no question or guess..."
//           className="border rounded-md px-3 py-2 w-64"
//           disabled={gameOver}
//         />
//         <button
//           className="btn-primary"
//           onClick={() => handleAsk(false)}
//           disabled={!question || gameOver}
//         >
//           Ask
//         </button>
//         <button
//           className="btn-secondary"
//           onClick={() => handleAsk(true)}
//           disabled={!question || gameOver}
//         >
//           Guess
//         </button>
//       </div>

//       <div className="mt-4 w-full max-w-md">
//         <h3 className="font-semibold mb-2">Suggested Questions:</h3>
//         <div className="flex flex-wrap gap-2 justify-center">
//           {data.suggestedQuestions.map((q, i) => (
//             <button
//               key={i}
//               onClick={() => setQuestion(q)}
//               className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
//               disabled={gameOver}
//             >
//               {q}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-6 w-full max-w-md text-left">
//         <h3 className="font-semibold mb-2">History:</h3>
//         <ul className="space-y-1 bg-gray-50 rounded-md p-3">
//           {log.map((line, idx) => (
//             <li key={idx} className="text-sm">
//               {line}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {gameOver && (
//         <div className="mt-6 text-xl font-bold text-green-600">
//           🎯 Game Over!
//         </div>
//       )}
//     </div>
//   );
// }
