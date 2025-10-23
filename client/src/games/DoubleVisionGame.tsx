// "use-client";
// import { useState, useEffect, useRef } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface DoubleVisionOption {
//     imageUrl: string;
//     label: string;
// }

// interface DoubleVisionData {
//     mainWord: string;
//     options: DoubleVisionOption[];
//     correctIndex: number;
// }

// interface DoubleVisionGameData {
//     rounds: DoubleVisionData[];
// }

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {

//     const [data, setData] = useState<DoubleVisionData[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const hasFetchedRef = useRef(false);
//     const [currentRound, setCurrentRound] = useState(0);


//     const url = 'https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/'
//     useEffect(() => {
//         if (hasFetchedRef.current) return;
//         hasFetchedRef.current = true;

//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/12/data");
//                 const gameData: DoubleVisionGameData = response.data.data.data;
//                 setData(gameData.rounds);
//             } catch (error) {
//                 console.error("Failed to fetch DoubleVision data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);


//     const handleClick = (index: number) => {
//         if (paused || selectedIndex !== null) return;
//         setSelectedIndex(index);
//         const correct = index === data[currentRound].correctIndex;
//         setIsCorrect(correct);

//         if (correct) onScoreChange?.(10);
//         else onScoreChange?.(0);

//         setTimeout(() => {
//             onGameOver?.();
//             setSelectedIndex(null);
//             setIsCorrect(null);
//         }, 1000);
//     };


//     if (loading) return <p>Loading...</p>;
//     if (!data) return <p>Error loading game data</p>;

//     console.log(data);

//     return (
//         <div className="doublevision">
//             <h2 className="doublevision__word">{data[currentRound].mainWord}</h2>
//             <div className="doublevision__grid">
//                 {data?.options?.map((option, idx) => (
//                     <motion.img
//                         key={idx}
//                         src={url + option.imageUrl}
//                         alt={option.label}
//                         className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
//                             } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//                         whileHover={{ scale: 1.1, rotate: 3 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                         onClick={() => handleClick(idx)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );

// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface DoubleVisionOption {
//   imageUrl: string;
//   label: string;
// }

// interface DoubleVisionRound {
//   mainWord: string;
//   options: DoubleVisionOption[];
//   correctIndex: number;
// }

// interface DoubleVisionGameData {
//   rounds: DoubleVisionRound[];
// }

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [data, setData] = useState<DoubleVisionRound[]>([]);
//   const [currentRound, setCurrentRound] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState(true);
//   const hasFetchedRef = useRef(false);

//   const url = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

//   // ✅ Fetch data once
//   useEffect(() => {
//     if (hasFetchedRef.current) return;
//     hasFetchedRef.current = true;

//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/12/data");
//         const gameData: DoubleVisionGameData = response.data.data.data;
//         setData(gameData.rounds);
//       } catch (error) {
//         console.error("Failed to fetch DoubleVision data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleClick = (index: number) => {
//     if (paused || selectedIndex !== null) return;

//     const correct = index === data[currentRound].correctIndex;
//     setSelectedIndex(index);
//     setIsCorrect(correct);

//     if (correct) onScoreChange?.(10);

//     setTimeout(() => {
//       setSelectedIndex(null);
//       setIsCorrect(null);

//       if (currentRound < data.length - 1) {
//         setCurrentRound((prev) => prev + 1);
//       } else {
//         onGameOver?.();
//       }
//     }, 1000);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!data.length) return <p>Error loading game data</p>;

//   const progress = ((currentRound + 1) / data.length) * 100;
//   const round = data[currentRound];

//   return (
//     <div className="doublevision">
//       {/* ✅ Progress bar */}
//       <div className="progress-bar" style={{ width: "100%", background: "#eee", height: "10px", borderRadius: "5px" }}>
//         <div
//           className="progress-bar__fill"
//           style={{
//             width: `${progress}%`,
//             background: "#4caf50",
//             height: "100%",
//             borderRadius: "5px",
//             transition: "width 0.3s ease"
//           }}
//         ></div>
//       </div>

//       <h2 className="doublevision__word">{round.mainWord}</h2>

//       <div className="doublevision__grid">
//         {round.options.map((option, idx) => (
//           <motion.img
//             key={idx}
//             src={url + option.imageUrl}
//             alt={option.label}
//             className={`doublevision__option ${
//               selectedIndex === idx && isCorrect ? "correct" : ""
//             } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//             whileHover={{ scale: 1.1, rotate: 3 }}
//             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//             onClick={() => handleClick(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface DoubleVisionOption {
//   imageUrl: string;
//   label: string;
// }

// interface DoubleVisionRound {
//   mainWord: string;
//   options: DoubleVisionOption[];
//   correctIndex: number;
// }

// interface DoubleVisionGameData {
//   rounds: DoubleVisionRound[];
// }

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const [data, setData] = useState<DoubleVisionRound[]>([]);
//   const [currentRound, setCurrentRound] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState(true);
//   const hasFetchedRef = useRef(false);

//   const url = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

//   // ✅ Fetch game data once
//   useEffect(() => {
//     if (hasFetchedRef.current) return;
//     hasFetchedRef.current = true;

//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/12/data");
//         const gameData: DoubleVisionGameData = response.data.data.items;
//         console.log("API response:", response.data);
//         setData(gameData.rounds);

//         // ✅ Preload images in the background
//         gameData.rounds.forEach((round) => {
//           round.options.forEach((opt) => {
//             const img = new Image();
//             img.src = url + opt.imageUrl;
//           });
//         });
//       } catch (error) {
//         console.error("Failed to fetch DoubleVision data:", error);
//       } finally {
//         // start game immediately
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleClick = (index: number) => {
//     if (paused || selectedIndex !== null) return;

//     const correct = index === data[currentRound].correctIndex;
//     setSelectedIndex(index);
//     setIsCorrect(correct);

//     if (correct) onScoreChange?.(10);

//     setTimeout(() => {
//       setSelectedIndex(null);
//       setIsCorrect(null);

//       if (currentRound < data.length - 1) {
//         setCurrentRound((prev) => prev + 1);
//       } else {
//         onGameOver?.();
//       }
//     }, 1000);
//   };

//   if (loading) return <p>טוען משחק...</p>;
//   if (!data.length) return <p>שגיאה בטעינת הנתונים</p>;

//   const progress = ((currentRound + 1) / data.length) * 100;
//   const round = data[currentRound];

//   return (
//     <div className="doublevision">
//       {/* ✅ Progress bar */}
//       <div
//         className="progress-bar"
//         style={{
//           width: "100%",
//           background: "#eee",
//           height: "10px",
//           borderRadius: "5px",
//           marginBottom: "10px",
//         }}
//       >
//         <div
//           className="progress-bar__fill"
//           style={{
//             width: `${progress}%`,
//             background: "#4caf50",
//             height: "100%",
//             borderRadius: "5px",
//             transition: "width 0.3s ease",
//           }}
//         ></div>
//       </div>

//       <h2 className="doublevision__word">{round.mainWord}</h2>

//       <div className="doublevision__grid">
//         {round.options.map((option, idx) => (
//           <motion.img
//             key={idx}
//             src={url + option.imageUrl}
//             alt={option.label}
//             className={`doublevision__option ${
//               selectedIndex === idx && isCorrect ? "correct" : ""
//             } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//             whileHover={{ scale: 1.1, rotate: 3 }}
//             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//             onClick={() => handleClick(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface DoubleVisionOption {
//     imageUrl: string;
//     label: string;
// }

// interface DoubleVisionRound {
//     mainWord: string;
//     options: DoubleVisionOption[];
//     correctIndex: number;
// }

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
//     const [data, setData] = useState<DoubleVisionRound[]>([]);
//     const [currentRound, setCurrentRound] = useState(0);
//     const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [loading, setLoading] = useState(true);
//     const hasFetchedRef = useRef(false);

//     const url = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

//     useEffect(() => {
//         if (hasFetchedRef.current) return;
//         hasFetchedRef.current = true;

//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/12/data");
//                 console.log("API response:", response.data);
//                 console.log("ITEM EXAMPLE:", response.data.data.items[0]);

//                 // 👇 כאן נמצא המערך של הנתונים שלך:
//                 const gameData: DoubleVisionRound[] = response.data?.data?.items || [];

//                 setData(gameData);
//             } catch (error) {
//                 console.error("Failed to fetch DoubleVision data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleClick = (index: number) => {
//         if (paused || selectedIndex !== null) return;

//         const correct = index === data[currentRound].correctIndex;
//         setSelectedIndex(index);
//         setIsCorrect(correct);

//         if (correct) onScoreChange?.(10);

//         setTimeout(() => {
//             setSelectedIndex(null);
//             setIsCorrect(null);
//             if (currentRound < data.length - 1) setCurrentRound((p) => p + 1);
//             else onGameOver?.();
//         }, 1000);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (!data.length) return <p>Error loading game data</p>;

//     const progress = ((currentRound + 1) / data.length) * 100;
//     const round = data[currentRound];

//     return (
//         <div className="doublevision">
//             {/* ✅ Progress bar */}
//             <div className="progress-bar" style={{ width: "100%", background: "#eee", height: "10px", borderRadius: "5px" }}>
//                 <div
//                     className="progress-bar__fill"
//                     style={{
//                         width: `${progress}%`,
//                         background: "#4caf50",
//                         height: "100%",
//                         borderRadius: "5px",
//                         transition: "width 0.3s ease",
//                     }}
//                 ></div>
//             </div>

//             <h2 className="doublevision__word">{round.mainWord}</h2>

//             <div className="doublevision__grid">
//                 {round.options.map((option, idx) => (
//                     <motion.img
//                         key={idx}
//                         src={url + option.imageUrl}
//                         alt={option.label}
//                         className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
//                             } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//                         whileHover={{ scale: 1.1, rotate: 3 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                         onClick={() => handleClick(idx)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { GameId } from "@/types";
// import { useGameData } from "@/hooks/useGameData";

// interface DoubleVisionOption {
//     imageUrl: string;
//     label: string;
// }

// interface DoubleVisionRound {
//     mainWord: string;
//     options: DoubleVisionOption[];
//     correctIndex: number;
// }

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
//     const gameId: GameId = 12;
//     const { data, isLoading, isError } = useGameData(gameId);
//     const [currentRound, setCurrentRound] = useState(0);
//     const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//     const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//     const [loading, setLoading] = useState(true);
//     const hasFetchedRef = useRef(false);

//     const url = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

//     if (isLoading) return <p>Loading game data...</p>;
//     if (isError || !data?.data?.items?.length)
//         return <p>Error loading DoubleVision game 😔</p>;

//     useEffect(() => {
//         if (hasFetchedRef.current) return;
//         hasFetchedRef.current = true;

//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/12/data");

//                 console.log("✅ API response:", response.data);

//                 const rounds: DoubleVisionRound[] = response.data?.data?.data?.items || [];

//                 if (!Array.isArray(rounds) || rounds.length === 0) {
//                     console.error("❌ No valid rounds found in API response");
//                     setData([]);
//                 } else {
//                     setData(rounds);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch DoubleVision data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleClick = (index: number) => {
//         if (paused || selectedIndex !== null) return;

//         const correct = index === data[currentRound].correctIndex;
//         setSelectedIndex(index);
//         setIsCorrect(correct);

//         if (correct) {
//             console.log("Answer correct! Adding 10 points");
//             onScoreChange?.((prev) => prev + 10);
//         }
//         setTimeout(() => {
//             setSelectedIndex(null);
//             setIsCorrect(null);

//             if (currentRound < data.length - 1) {
//                 setCurrentRound((prev) => prev + 1);
//             } else {
//                 onGameOver?.();
//             }
//         }, 1000);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (!data.length) return <p>Error loading game data</p>;

//     const progress = ((currentRound + 1) / data.length) * 100;
//     const round = data[currentRound];

//     return (
//         <div className="doublevision">
//             {/* ✅ Progress bar */}
//             <div
//                 className="progress-bar"
//                 style={{
//                     width: "100%",
//                     background: "#eee",
//                     height: "10px",
//                     borderRadius: "5px",
//                     marginBottom: "15px",
//                 }}
//             >
//                 <div
//                     className="progress-bar__fill"
//                     style={{
//                         width: `${progress}%`,
//                         background: "#4caf50",
//                         height: "100%",
//                         borderRadius: "5px",
//                         transition: "width 0.4s ease",
//                     }}
//                 ></div>
//             </div>

//             <h2 className="doublevision__word">{round.mainWord}</h2>

//             <div className="doublevision__grid">
//                 {round.options.map((option, idx) => (
//                     <motion.img
//                         key={idx}
//                         src={url + option.imageUrl}
//                         alt={option.label}
//                         className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
//                             } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//                         whileHover={{ scale: 1.1, rotate: 3 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                         onClick={() => handleClick(idx)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import { GameId } from "@/types";
// import { useGameData } from "@/hooks/useGameData";
// import { DoubleVisionItem } from "@/types/DoubleVision";

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const gameId: GameId = 12;
//   const { data, isLoading, isError } = useGameData(gameId);
//   console.log(data)
//   const [currentRound, setCurrentRound] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

//   const baseUrl = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

//   // נוודא שהנתונים מוכנים
//   if (isLoading) return <p>Loading game data...</p>;
//   if (isError || !data?.data?.items?.length)
//     return <p>Error loading DoubleVision game 😔</p>;

//   const rounds: DoubleVisionItem[] = data.data.items || [];
//   const round = rounds[currentRound];

//   const handleClick = (index: number) => {
//     if (paused || selectedIndex !== null) return;

//     const correct = index === round.correctIndex;
//     setSelectedIndex(index);
//     setIsCorrect(correct);

//     if (correct) {
//       onScoreChange?.((prev) => prev + 10);
//     }

//     setTimeout(() => {
//       setSelectedIndex(null);
//       setIsCorrect(null);

//       if (currentRound < rounds.length - 1) {
//         setCurrentRound((prev) => prev + 1);
//       } else {
//         onGameOver?.();
//       }
//     }, 1000);
//   };

//   const progress = ((currentRound + 1) / rounds.length) * 100;

//   return (
//     <div className="doublevision">
//       {/* Progress bar */}
//       <div
//         className="progress-bar"
//         style={{
//           width: "100%",
//           background: "#eee",
//           height: "10px",
//           borderRadius: "5px",
//           marginBottom: "15px",
//         }}
//       >
//         <div
//           className="progress-bar__fill"
//           style={{
//             width: `${progress}%`,
//             background: "#4caf50",
//             height: "100%",
//             borderRadius: "5px",
//             transition: "width 0.4s ease",
//           }}
//         ></div>
//       </div>

//       <h2 className="doublevision__word">{round.mainWord}</h2>

//       <div className="doublevision__grid">
//         {round.options.map((option, idx) => (
//           <motion.img
//             key={idx}
//             src={baseUrl + option.imageUrl}
//             alt={option.label}
//             className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
//               } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//             whileHover={{ scale: 1.1, rotate: 3 }}
//             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//             onClick={() => handleClick(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { GameProps } from "@/components/common/GameLayout";
// import { motion } from "framer-motion";
// import { GameId } from "@/types";
// import { useGameData } from "@/hooks/useGameData";
// import { DoubleVisionItem } from "@/types/DoubleVision";

// export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const gameId: GameId = 12;
//   const { data, isLoading, isError, refetch } = useGameData(gameId, { staleTime: 0 });
//   console.log(data);

//   const [currentRound, setCurrentRound] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   const restartGame = () => {
//     setCurrentRound(0);
//     setSelectedIndex(null);
//     setIsCorrect(null);
//     refetch();  // כאן מבצעים קריאה חדשה לשרת
//   };

//   const baseUrl = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

//   // Loading/Error states
//   if (isLoading) return <p>Loading game data...</p>;
//   if (isError || !data?.data?.data?.items?.length)
//     return <p>Error loading DoubleVision game 😔</p>;

//   const rounds: DoubleVisionItem[] = data.data.data.items || [];
//   const round = rounds[currentRound];

//   const handleClick = (index: number) => {
//     if (paused || selectedIndex !== null) return;

//     const correct = index === round.correctIndex;
//     setSelectedIndex(index);
//     setIsCorrect(correct);

//     if (correct) onScoreChange?.((prev) => prev + 10);

//     setTimeout(() => {
//       setSelectedIndex(null);
//       setIsCorrect(null);

//       if (currentRound < rounds.length - 1) {
//         setCurrentRound((prev) => prev + 1);
//       } else {
//         onGameOver?.();
//         restartGame();
//       }
//     }, 1000);
//   };

//   const progress = ((currentRound + 1) / rounds.length) * 100;

//   return (
//     <div className="doublevision">
//       {/* Progress bar */}
//       <div
//         className="progress-bar"
//         style={{
//           width: "100%",
//           background: "#eee",
//           height: "10px",
//           borderRadius: "5px",
//           marginBottom: "15px",
//         }}
//       >
//         <div
//           className="progress-bar__fill"
//           style={{
//             width: `${progress}%`,
//             background: "#4caf50",
//             height: "100%",
//             borderRadius: "5px",
//             transition: "width 0.4s ease",
//           }}
//         />
//       </div>

//       <h2 className="doublevision__word">{round.mainWord}</h2>

//       <div className="doublevision__grid">
//         {round.options.map((option, idx) => (
//           <motion.img
//             key={option.label + idx}
//             src={baseUrl + option.imageUrl}
//             alt={option.label}
//             className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
//               } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
//             whileHover={{ scale: 1.1, rotate: 3 }}
//             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//             onClick={() => handleClick(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { motion } from "framer-motion";
import { GameId } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { DoubleVisionItem } from "@/types/DoubleVision";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";

export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId: GameId = 12;
  const { data, isLoading, isError, refetch } = useGameData(gameId, { staleTime: 0 });
  const { data: leaderboardData, refetch: refetchLeaderboard } = useLeaderboard(gameId);
  const submitProgressMutation = useSubmitProgress();

  const [currentRound, setCurrentRound] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [rounds, setRounds] = useState<DoubleVisionItem[]>([]);
  const hasFetchedRef = useRef(false);

  const baseUrl = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

  // ✅ Load data once
  useEffect(() => {
    if (!data || hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const items: DoubleVisionItem[] = data.data?.data?.items || [];
    setRounds(items);
  }, [data]);

  const restartGame = async () => {
    setCurrentRound(0);
    setSelectedIndex(null);
    setIsCorrect(null);
    const newData = await refetch();
    const items: DoubleVisionItem[] = newData?.data?.data?.items || [];
    setRounds(items);
  };

  const handleClick = (index: number) => {
    if (paused || selectedIndex !== null) return;

    const round = rounds[currentRound];
    const correct = index === round.correctIndex;
    setSelectedIndex(index);
    setIsCorrect(correct);

    if (correct) onScoreChange?.((prev) => prev + 10);

    // שמירה קצרה של האנימציה לפני מעבר
    setTimeout(() => {
      setSelectedIndex(null);
      setIsCorrect(null);

      if (currentRound < rounds.length - 1) {
        setCurrentRound((prev) => prev + 1);
      } else {
        onGameOver?.();
        restartGame();
      }
    }, 600);
  };

  if (isLoading || !rounds.length) return <p>Loading game data...</p>;
  if (isError) return <p>Error loading DoubleVision game 😔</p>;

  const round = rounds[currentRound];
  const progress = ((currentRound + 1) / rounds.length) * 100;

  return (
    <div className="doublevision">
      <div
        className="progress-bar"
        style={{
          width: "100%",
          background: "#eee",
          height: "10px",
          borderRadius: "5px",
          marginBottom: "15px",
        }}
      >
        <div
          className="progress-bar__fill"
          style={{
            width: `${progress}%`,
            background: "#4caf50",
            height: "100%",
            borderRadius: "5px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <h2 className="doublevision__word">{round.mainWord}</h2>

      <div className="doublevision__grid">
        {round.options.map((option, idx) => (
          <motion.img
            key={option.label + idx}
            src={baseUrl + option.imageUrl}
            alt={option.label}
            className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""} ${selectedIndex === idx && isCorrect === false ? "wrong" : ""
              }`}
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
