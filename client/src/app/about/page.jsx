"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="page-container text-center">
      <motion.h1
        className="section-title text-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About the Project
      </motion.h1>

      <motion.div
        className="card max-w-3xl mx-auto text-slate-300 leading-relaxed space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p>
          This educational platform hosts a collection of interactive mini-games
          designed to make English learning engaging, visual, and fun.
        </p>

        <p>
          Each game focuses on a unique language skill — from building
          sentences, matching pictures, and spotting grammar mistakes, to
          learning idioms and rhyming words. All games share a unified layout
          and smooth transitions powered by <strong>Framer Motion</strong>.
        </p>

        <p>
          The system is built with <strong>Next.js 14</strong>,{" "}
          <strong>React 18</strong>, and <strong>Tailwind CSS</strong>, using
          modern libraries like <strong>Zustand</strong> for state management
          and <strong>React Query</strong> for API integration.
        </p>

        <p>
          This modular architecture allows every game — such as{" "}
          <em>Sentence Shuffle</em>, <em>Double Vision</em>, and{" "}
          <em>WordWise Flash</em> — to live as an independent React component
          inside a shared ecosystem.
        </p>

        <p className="text-indigo-400 font-medium">
          🎯 The mission: make learning English playful, intuitive, and
          rewarding.
        </p>
      </motion.div>
    </section>
  );
}
