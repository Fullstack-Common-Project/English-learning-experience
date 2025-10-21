"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  stage: string;
  children: ReactNode;
}

export default function GameLayout({ stage, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}



// "use client";
// import { ReactNode } from "react";
// import { motion } from "framer-motion";

// export default function GameLayout({ title, children }: { title: string; children: ReactNode }) {
//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 mx-auto max-w-3xl mt-10 border border-gray-200"
//     >
//       <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">{title}</h1>
//       {children}
//     </motion.section>
//   );
// }
