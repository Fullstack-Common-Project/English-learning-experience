import React, { useState } from "react";
import { HelpDialog } from "../components/dialogs/HelpDialog";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function Help() {
  const [open, setOpen] = useState(false);
  useKeyboardShortcuts({ h: () => setOpen(true) });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">מסך עזרה</h1>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
        פתח עזרה
      </button>
      {open && <HelpDialog onClose={() => setOpen(false)} />}
    </div>
  );
}
