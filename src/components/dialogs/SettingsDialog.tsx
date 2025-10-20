// "use client";
// import React, { useState } from "react";

// interface SettingsDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
//   const [volume, setVolume] = useState(50);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
//         <h2 className="text-lg font-semibold mb-3">הגדרות</h2>
//         <label className="block mb-4">
//           עוצמת שמע:
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={volume}
//             onChange={(e) => setVolume(Number(e.target.value))}
//             className="w-full mt-1"
//           />
//         </label>
//         <button
//           onClick={onClose}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           סגור
//         </button>
//       </div>
//     </div>
//   );
// }



// src/components/dialogs/SettingsDialog.tsx

// import React, { useState } from "react";

// export interface SettingsDialogProps {
//   settings: { sound: boolean; difficulty: string };
//   onSave: (newSettings: { sound: boolean; difficulty: string }) => void;
//   onClose: () => void;
// }

// const SettingsDialog: React.FC<SettingsDialogProps> = ({ settings, onSave, onClose }) => {
//   const [localSettings, setLocalSettings] = useState(settings);

//   const handleSave = () => {
//     onSave(localSettings);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//       <div className="bg-white p-6 rounded-lg shadow-md w-80">
//         <h2 className="text-xl font-bold mb-4">Settings ⚙️</h2>

//         <label className="block mb-3">
//           <input
//             type="checkbox"
//             checked={localSettings.sound}
//             onChange={(e) =>
//               setLocalSettings({ ...localSettings, sound: e.target.checked })
//             }
//           />{" "}
//           Enable sound
//         </label>

//         <label className="block mb-3">
//           Difficulty:
//           <select
//             value={localSettings.difficulty}
//             onChange={(e) =>
//               setLocalSettings({ ...localSettings, difficulty: e.target.value })
//             }
//             className="ml-2 border rounded p-1"
//           >
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>
//         </label>

//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             onClick={onClose}
//             className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsDialog;



// components/dialogs/SettingsDialog.tsx
import React, { useState } from "react";
import type { Settings } from "@/types/settings"; // עדכני את הנתיב בהתאם לפרויקט שלך

export interface SettingsDialogProps {
  settings: Settings;
  onSave: (newSettings: Settings) => void;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState<Settings>(settings);

  const handleSave = () => onSave(localSettings);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      {/* <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Settings ⚙️</h2>

        <label className="block mb-3">
          <input
            type="checkbox"
            checked={localSettings.sound}
            onChange={(e) => setLocalSettings({ ...localSettings, sound: e.target.checked })}
          />{" "}
          Enable sound
        </label>

        <label className="block mb-3">
          Difficulty:
          <select
            value={localSettings.difficulty}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                difficulty: e.target.value as Settings["difficulty"],
              })
            }
            className="ml-2 border rounded p-1"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div> */}

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-[90%] sm:w-96 text-center border border-gray-100">
  <h2 className="text-2xl font-bold text-green-700 mb-6">⚙️ Settings</h2>

  <label className="block mb-4 text-gray-700">
    <input
      type="checkbox"
      checked={localSettings.sound}
      onChange={(e) =>
        setLocalSettings({ ...localSettings, sound: e.target.checked })
      }
      className="mr-2 accent-green-600"
    />
    Enable sound
  </label>

  <label className="block mb-6 text-gray-700">
    Difficulty:
    <select
      value={localSettings.difficulty}
      onChange={(e) =>
        setLocalSettings({ ...localSettings, difficulty: e.target.value as "easy" | "medium" | "hard", })
      }
      className="ml-2 border border-gray-300 rounded-md px-2 py-1"
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </label>

  <div className="flex justify-center gap-3">
    <button
      onClick={onClose}
      className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-transform hover:scale-105"
    >
      Cancel
    </button>
    <button
      onClick={handleSave}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-transform hover:scale-105"
    >
      Save
    </button>
  </div>
</div>

    </div>
  );
};

export default SettingsDialog;
