"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

type Props = {
  onMenuToggle: () => void;
  mobileOpen: boolean;
  playerName: string;
};

export default function UserSection({
  onMenuToggle,
  mobileOpen,
  playerName,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // נוודא שהקומפוננטה כבר נטענה בצד הלקוח
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    setOpenMenu(false);
  };

  // בזמן רינדור בשרת, לא נציג כלום כדי למנוע mismatch
  if (!isClient) return null;

  return (
    <div className="relative flex items-center gap-4">
      {/* פרופיל משתמש */}
      <div className="relative">
        <button
          onClick={() => setOpenMenu((p) => !p)}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg hover:from-indigo-400 hover:to-sky-400 transition-all"
          title={playerName}
        >
          {playerName?.charAt(0)?.toUpperCase() ?? "?"}
        </button>

        {/* תפריט קטן מתחת לעיגול */}
        {openMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-slate-800/90 backdrop-blur-md text-slate-100 rounded-xl shadow-lg border border-slate-700/50 z-50">
            <div className="px-4 py-2 text-sm border-b border-slate-700/40">
              {playerName}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/30 transition-all rounded-b-xl"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {/* כפתור תפריט מובייל */}
      <button
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={onMenuToggle}
        className="p-2 rounded-md md:hidden text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
