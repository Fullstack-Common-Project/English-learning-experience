import HomePageClient from "@/components/HomePageClient";

export default function HomePage() {
  return <HomePageClient />;
}



// "use client"; // ← חייב להיות השורה הראשונה!

// // app/page.tsx
// import Link from "next/link";
// import { motion } from "framer-motion";

// const games = [
//   { name: "Rhyme Time", path: "/games/rhyme-time", color: "from-pink-400 to-rose-500" },
//   { name: "Sentence Shuffle", path: "/games/sentence-shuffle", color: "from-blue-400 to-indigo-500" },
//   { name: "Grammar Guru", path: "/games/grammar-guru", color: "from-green-400 to-emerald-500" },
// ];

// export default function HomePage() {
//   return (
//     <section className="flex flex-col items-center justify-center text-center gap-8 py-16">
//       <motion.h1
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm"
//       >
//         בחרי משחק ולמדי אנגלית בכיף! 💬
//       </motion.h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {games.map((game) => (
//           <motion.div
//             key={game.name}
//             whileHover={{ scale: 1.05 }}
//             className={`rounded-2xl shadow-lg bg-gradient-to-br ${game.color} p-6 text-white font-bold transition`}
//           >
//             <Link href={game.path}>
//               <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
//                 <span className="text-2xl">{game.name}</span>
//                 <span className="text-sm opacity-90">לחצי כדי לשחק 🎮</span>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
