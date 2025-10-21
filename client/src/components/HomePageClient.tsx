"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HelpDialog from "@/components/dialogs/HelpDialog";
import SettingsDialog from "@/components/dialogs/SettingsDialog";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Toast from "@/components/feedback/Toast";

import { Timer } from "@/components/common/Timer";


// ✅ טיימר פשוט
// function Timer() {
//   const [seconds, setSeconds] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="fixed top-4 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow border border-indigo-200 text-indigo-700 font-semibold text-sm">
//       ⏱️ {seconds}s
//     </div>
//   );
// }

// ✅ ניקוד כללי (placeholder)
function ScoreDisplay({ score }: { score: number }) {
  return (
    <div className="fixed top-4 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow border border-indigo-200 text-indigo-700 font-semibold text-sm">
      ⭐ Score: {score}
    </div>
  );
}

export default function HomePageClient() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [playerName, setPlayerName] = useState("Guest"); // ✨ שם משתמש זמני
  const [score, setScore] = useState(0); // ✨ ניקוד ראשי

  const games = [
    { id: 1, name: "🎵 Rhyme Time", path: "/games/rhyme-time", color: "from-pink-400 to-rose-500" },
    { id: 2, name: "🧩 Sentence Shuffle", path: "/games/sentence-shuffle", color: "from-blue-400 to-indigo-500" },
    { id: 3, name: "🧠 Grammar Guru", path: "/games/grammar-guru", color: "from-green-400 to-emerald-500" },
    { id: 4, name: "🔤 Letter Chaos", path: "/games/letter-chaos", color: "from-yellow-400 to-orange-500" },
    { id: 5, name: "❓ Opposite Quest", path: "/games/opposite-quest", color: "from-purple-500 to-violet-600" },
    { id: 6, name: "💡 WordWise Flash", path: "/games/wordwise-flash", color: "from-cyan-500 to-sky-600" },
  ];

  const handleConfirm = () => {
    setToastMessage("✅ אישרת את תנאי השימוש בהצלחה!");
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center py-12 px-6 relative">
      {/* ✅ תוספות קבועות בראש המסך */}
      <Timer />
      <ScoreDisplay score={score} />

      {/* כותרת */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-indigo-700 drop-shadow mb-2 text-center"
      >
        🎓 Learn English Games
      </motion.h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        💬 Choose a game and learn English while having fun 
      </p>

      {/* אייקוני דיאלוגים */}
      <div className="flex gap-8 mb-12 text-3xl">
        <button onClick={() => setShowHelp(true)} className="hover:text-indigo-600 hover:scale-110 transition">❔</button>
        <button onClick={() => setShowSettings(true)} className="hover:text-indigo-600 hover:scale-110 transition">⚙️</button>
        <button onClick={() => setShowConfirm(true)} className="hover:text-indigo-600 hover:scale-110 transition">📜</button>
      </div>

      {/* גריד כרטיסים */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${game.color} text-white rounded-3xl shadow-xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{game.name}</h2>
            <Link href={game.path}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold shadow hover:bg-gray-100 transition"
              >
                🎮 התחילי לשחק
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* פוטר */}
      <footer className="mt-16 text-gray-500 text-sm text-center">
        © 2025 English Learning Platform | Built with ❤️ by Team Experis
      </footer>

      {/* דיאלוגים */}
      <AnimatePresence>
        {showHelp && <HelpDialog open={showHelp} onClose={() => setShowHelp(false)} />}
        {showSettings && <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />}
        {showConfirm && (
          <ConfirmDialog
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={handleConfirm}
            message="?Do you agree to the terms of use of the site"
          />
        )}
        {toastMessage && <Toast message={toastMessage} />}
      </AnimatePresence>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import HelpDialog from "@/components/dialogs/HelpDialog";
// import SettingsDialog from "@/components/dialogs/SettingsDialog";
// import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
// import Toast from "@/components/feedback/Toast";

// export default function HomePageClient() {
//   const [showHelp, setShowHelp] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");

//   const games = [
//     { id: 1, name: "🎵 Rhyme Time", path: "/games/rhyme-time", color: "from-pink-400 to-rose-500" },
//     { id: 2, name: "🧩 Sentence Shuffle", path: "/games/sentence-shuffle", color: "from-blue-400 to-indigo-500" },
//     { id: 3, name: "🧠 Grammar Guru", path: "/games/grammar-guru", color: "from-green-400 to-emerald-500" },
//     { id: 4, name: "🔤 Letter Chaos", path: "/games/letter-chaos", color: "from-yellow-400 to-orange-500" },
//     { id: 5, name: "❓ Opposite Quest", path: "/games/opposite-quest", color: "from-purple-500 to-violet-600" },
//     { id: 6, name: "💡 WordWise Flash", path: "/games/wordwise-flash", color: "from-cyan-500 to-sky-600" },
//   ];

//   const handleConfirm = () => {
//     setToastMessage("✅ אישרת את תנאי השימוש בהצלחה!");
//     setShowConfirm(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center py-12 px-6">
//       {/* כותרת */}
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-5xl font-extrabold text-indigo-700 drop-shadow mb-2 text-center"
//       >
//         🎓 Learn English Games
//       </motion.h1>

//       <p className="text-lg text-gray-700 mb-8 text-center">
     
//         💬 Choose a game and learn English while having fun 
//       </p>

//       {/* אייקוני דיאלוגים */}
//       <div className="flex gap-8 mb-12 text-3xl">
//         <button onClick={() => setShowHelp(true)} className="hover:text-indigo-600 hover:scale-110 transition">❔</button>
//         <button onClick={() => setShowSettings(true)} className="hover:text-indigo-600 hover:scale-110 transition">⚙️</button>
//         <button onClick={() => setShowConfirm(true)} className="hover:text-indigo-600 hover:scale-110 transition">📜</button>
//       </div>

//       {/* גריד כרטיסים */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-full max-w-6xl">
//         {games.map((game) => (
//           <motion.div
//             key={game.id}
//             whileHover={{ scale: 1.05 }}
//             className={`bg-gradient-to-br ${game.color} text-white rounded-3xl shadow-xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl`}
//           >
//             <h2 className="text-2xl font-bold mb-6 text-center">{game.name}</h2>
//             <Link href={game.path}>
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold shadow hover:bg-gray-100 transition"
//               >
//                 🎮 התחילי לשחק
//               </motion.button>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* פוטר */}
//       <footer className="mt-16 text-gray-500 text-sm text-center">
//         © 2025 English Learning Platform | Built with ❤️ by Team Experis
//       </footer>

//       {/* דיאלוגים */}
//       <AnimatePresence>
//         {showHelp && <HelpDialog open={showHelp} onClose={() => setShowHelp(false)} />}
//         {showSettings && <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />}
//         {showConfirm && (
//           <ConfirmDialog
//             open={showConfirm}
//             onClose={() => setShowConfirm(false)}
//             onConfirm={handleConfirm}
//             message="?Do you agree to the terms of use of the site"
//           />
//         )}
//         {toastMessage && <Toast message={toastMessage} />}
//       </AnimatePresence>
//     </div>
//   );
// }
