"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HelpDialog from "@/components/dialogs/HelpDialog";
import SettingsDialog from "@/components/dialogs/SettingsDialog";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Toast from "@/components/feedback/Toast";
import { usePlatformGames } from "@/hooks/usePlatformGames";

export default function HomePage() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { data } = usePlatformGames();
  console.log("Games data:", data);
  
 const styleMap: Record<number, { color: string; emoji: string }> = {
   1: { color: "from-purple-400 to-violet-500", emoji: "❓" }, // Opposite Quest
   2: { color: "from-sky-400 to-blue-500", emoji: "🪢" }, // Picture Hangman
   3: { color: "from-yellow-400 to-orange-500", emoji: "🔤" }, // Letter Chaos
   6: { color: "from-green-400 to-emerald-500", emoji: "🧩" }, // Mini Wordle
   7: { color: "from-pink-400 to-rose-500", emoji: "📚" }, // Word Sorter
   8: { color: "from-indigo-400 to-blue-600", emoji: "🧠" }, // Memory Match: Synonyms
   9: { color: "from-amber-400 to-orange-500", emoji: "✍️" }, // Grammar Guru
   10: { color: "from-teal-400 to-green-500", emoji: "🌀" }, // TwinWords
   11: { color: "from-cyan-500 to-sky-600", emoji: "⚖️" }, // Memory Match: Antonyms
   12: { color: "from-rose-400 to-red-500", emoji: "👀" }, // Double Vision
   14: { color: "from-lime-400 to-green-500", emoji: "🎯" }, // GuessMaster 20
   15: { color: "from-blue-400 to-indigo-500", emoji: "🔍" }, // Context Clues
   16: { color: "from-fuchsia-400 to-pink-500", emoji: "💬" }, // Phrase Craze
   17: { color: "from-violet-400 to-purple-600", emoji: "🖼️" }, // PicPick
   18: { color: "from-teal-400 to-green-500", emoji: "🎵" }, // Rhyme Time
 };

  const mergedGames =
    data?.map((game) => ({
      id: game.gameId,
      name: game.gameName,
      description: game.description,
      instructions: game.instructions,
      path: `/games/${game.gameName.toLowerCase().replace(/\s+/g, "-")}`,
      ...styleMap[game.gameId], // מוסיף צבע ואימוג׳י
    })) ?? [];
  
  const handleConfirm = () => {
    setToastMessage("✅ אישרת את תנאי השימוש בהצלחה!");
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center py-12 px-6 relative">
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
        <button
          onClick={() => setShowHelp(true)}
          className="hover:text-indigo-600 hover:scale-110 transition"
        >
          ❔
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="hover:text-indigo-600 hover:scale-110 transition"
        >
          ⚙️
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="hover:text-indigo-600 hover:scale-110 transition"
        >
          📜
        </button>
      </div>

      {/* גריד כרטיסים */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {mergedGames.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${game.color} text-white rounded-3xl shadow-xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">{game.name} {game.emoji }</h2>
            <Link href={game.path}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold shadow hover:bg-gray-100 transition"
              >
                🎮Lets Start
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showHelp && (
          <HelpDialog open={showHelp} onClose={() => setShowHelp(false)} />
        )}
        {showSettings && (
          <SettingsDialog
            open={showSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
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
