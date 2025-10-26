"use client";

import Link from "next/link";

type Props = {
  onClose: () => void;
};

export default function MobileMenu({ onClose }: Props) {
  return (
    <div className="flex justify-center gap-3">
      <Link
        href="/login"
        onClick={onClose}
        className="px-4 py-1.5 rounded-lg font-medium text-slate-100 bg-indigo-400/20 hover:bg-indigo-400/40 hover:text-white transition-all duration-200 text-sm"
      >
        Log in
      </Link>
      <Link
        href="/sign-up"
        onClick={onClose}
        className="px-4 py-1.5 rounded-lg font-medium text-indigo-300 border border-indigo-400/50 hover:bg-indigo-400/30 hover:text-white transition-all duration-200 text-sm"
      >
        Sign up
      </Link>
    </div>
  );
}
