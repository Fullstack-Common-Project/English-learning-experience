"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Header() {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-lg shadow">
      <Link href="/" className="text-indigo-700 font-bold text-lg">
        🎓 Learn English Games
      </Link>
      {username && <p className="text-gray-700 font-medium">👤 {username}</p>}
    </header>
  );
}
