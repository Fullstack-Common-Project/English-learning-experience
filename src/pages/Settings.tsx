// import React, { useState } from "react";
// import { SettingsDialog } from "../components/dialogs/SettingsDialog";
// import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

// export default function Settings() {
//   const [open, setOpen] = useState(false);
//   useKeyboardShortcuts({ s: () => setOpen(true) });

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">מסך הגדרות</h1>
//       <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
//         פתח הגדרות
//       </button>
//       {open && <SettingsDialog onClose={() => setOpen(false)} />}
//     </div>
//   );
// }




import React, { useState } from "react";
import SettingsDialog from "../components/dialogs/SettingsDialog";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useLocalStorage } from "../hooks/useLocalStorage";

import type { Settings } from "../types/settings";

export default function Settings() {
    const [open, setOpen] = useState(false);

    // שמירת ההגדרות בלוקאל סטורג'
    //   const [settings, setSettings] = useLocalStorage("userSettings", {
    //     sound: true,
    //     difficulty: "medium",
    //   });

    // const [settings, setSettings] = useLocalStorage<{
    //     sound: boolean;
    //     difficulty: "easy" | "medium" | "hard";
    // }>("userSettings", {
    //     sound: true,
    //     difficulty: "medium",
    // });

    const [settings, setSettings] = useLocalStorage<Settings>("userSettings", {
        sound: true,
        difficulty: "medium",
    });





    useKeyboardShortcuts({ s: () => setOpen(true) });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-3">מסך הגדרות</h1>

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setOpen(true)}
            >
                פתח הגדרות
            </button>

            {open && (
                <SettingsDialog
                    settings={settings} // 👈 חובה
                    onSave={(newSettings) => {
                        setSettings(newSettings); // שמור הגדרות חדשות
                        setOpen(false); // סגור את החלון
                    }}
                    onClose={() => setOpen(false)} // 👈 חובה
                />
            )}
        </div>
    );
}
