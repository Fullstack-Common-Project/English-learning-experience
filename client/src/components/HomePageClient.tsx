"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HelpDialog from "@/components/dialogs/HelpDialog";
import SettingsDialog from "@/components/dialogs/SettingsDialog";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Toast from "@/components/feedback/Toast";

export default function HomePageClient() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const games = [
    { id: 1, name: "🎵 Rhyme Time", path: "/games/rhyme-time" },
    { id: 2, name: "🧩 Sentence Shuffle", path: "/games/sentence-shuffle" },
    { id: 3, name: "🧠 Grammar Guru", path: "/games/grammar-guru" },
    { id: 4, name: "🔤 Letter Chaos", path: "/games/letter-chaos" },
    { id: 5, name: "❓ Opposite Quest", path: "/games/opposite-quest" },
    { id: 6, name: "💡 WordWise Flash", path: "/games/wordwise-flash" },
  ];

  const handleConfirm = () => {
    setToastMessage("✅ אישרת את תנאי השימוש בהצלחה!");
    setShowConfirm(false);
  };

  return (
    <main className="page-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-title"
      >
        🎓 Learn English Games
      </motion.h1>

      <p className="text-center text-slate-300 mb-10">
        💬 Choose a game and learn English while having fun
      </p>

      <div className="cards-grid">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.03 }}
            className="game-card"
          >
            <h2 className="game-card__title">{game.name}</h2>
            <Link href={game.path}>
              <motion.button whileTap={{ scale: 0.95 }} className="btn-primary">
                🎮 התחילי לשחק
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      <footer className="footer mt-12">
        <div className="footer__container">
          <h3 className="footer__title">© 2025 English Learning Platform</h3>
          <p className="text-sm text-gray-400">
            Built with ❤️ by Team Experis
          </p>
        </div>
      </footer>

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
      </AnimatePresence>
    </main>)
}