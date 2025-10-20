// "use client";
// import React, { useState } from "react";
// import { HelpDialog } from "../components/dialogs/HelpDialog";
// import { SettingsDialog } from "../components/dialogs/SettingsDialog";
// import { ConfirmDialog } from "../components/dialogs/ConfirmDialog";
// import { ResultsDialog } from "../components/dialogs/ResultsDialog";
// import { Toast } from "../components/feedback/Toast";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
// import { useAudio } from "../hooks/useAudio";

// export default function HomePage() {
//   const [showHelp, setShowHelp] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [toast, setToast] = useState("");

//   // שמירת הגדרות בלוקאל סטורג'
//   const [settings, setSettings] = useLocalStorage("userSettings", {
//     sound: true,
//     difficulty: "medium",
//   });

//   // נגן צלילים
//   const { play } = useAudio("/sounds/click.mp3");

//   // קיצורי מקלדת
//   useKeyboardShortcuts({
//     h: () => setShowHelp(true),
//     s: () => setShowSettings(true),
//     r: () => setShowResults(true),
//     c: () => setShowConfirm(true),
//   });

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 bg-gray-100">
//       <h1 className="mb-4 text-3xl font-bold">🎮 Educational Games Dashboard</h1>

//       <div className="flex gap-4">
//         <button
//           className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//           onClick={() => {
//             setShowHelp(true);
//             play();
//           }}
//         >
//           Help
//         </button>

//         <button
//           className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
//           onClick={() => {
//             setShowSettings(true);
//             play();
//           }}
//         >
//           Settings
//         </button>

//         <button
//           className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
//           onClick={() => {
//             setShowResults(true);
//             play();
//           }}
//         >
//           Results
//         </button>

//         <button
//           className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//           onClick={() => {
//             setShowConfirm(true);
//             play();
//           }}
//         >
//           Confirm
//         </button>
//       </div>

//       {/* דיאלוגים */}
//       {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
//       {showSettings && (
//         // <SettingsDialog
//         //   settings={settings}
//         //   onSave={(newSettings) => {
//         //     setSettings(newSettings);
//         //     setToast("Settings saved!");
//         //     setShowSettings(false);
//         //   }}
//         //   onClose={() => setShowSettings(false)}
//         // />

//         <SettingsDialog
//           settings={settings}
//           onSave={(newSettings) => {
//             setSettings(newSettings);
//             setToast("Settings saved!");
//             setShowSettings(false);
//           }}
//           onClose={() => setShowSettings(false)}
//         />
//       )}

//       {showResults && <ResultsDialog score={85} onClose={() => setShowResults(false)} />}

//       {showConfirm && (
//         <ConfirmDialog
//           message="Are you sure?"
//           onConfirm={() => {
//             setToast("Action confirmed!");
//             setShowConfirm(false);
//           }}
//           onCancel={() => setShowConfirm(false)}
//         />
//       )}

//       {/* Toast */}
//       {toast && <Toast message={toast} onClose={() => setToast("")} />}
//     </main>
//   );
// }






// "use client";
// import React, { useState } from "react";
// import {HelpDialog} from "../components/dialogs/HelpDialog";
// import SettingsDialog from "../components/dialogs/SettingsDialog";
// import {ConfirmDialog} from "../components/dialogs/ConfirmDialog";
// import ResultsDialog from "../components/dialogs/ResultsDialog";
// import Toast from "../components/feedback/Toast";
// import {useLocalStorage} from "../hooks/useLocalStorage";
// import {useKeyboardShortcuts} from "../hooks/useKeyboardShortcuts";
// import useAudio from "../hooks/useAudio";
// import type { Settings } from "../types/settings"; // הנתיב לפי איפה ששמת את הקובץ

// export default function HomePage() {
//   const [showHelp, setShowHelp] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [toast, setToast] = useState("");

//   const [settings, setSettings] = useLocalStorage<Settings>("userSettings", {
//     sound: true,
//     difficulty: "medium",
//   });

//   const { play } = useAudio("/click.mp3");

//   useKeyboardShortcuts({
//     h: () => setShowHelp(true),
//     s: () => setShowSettings(true),
//     r: () => setShowResults(true),
//     c: () => setShowConfirm(true),
//   });

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 bg-gray-100">
//       {/* ... כפתורים ... */}

//       {showSettings && (
//         <SettingsDialog
//           settings={settings}
//           onSave={(newSettings: Settings) => {
//             setSettings(newSettings);
//             setToast("Settings saved!");
//             setShowSettings(false);
//           }}
//           onClose={() => setShowSettings(false)}
//         />
//       )}

//       {showResults && <ResultsDialog score={85} onClose={() => setShowResults(false)} />}
//       {showConfirm && (
//         <ConfirmDialog
//           message="Are you sure?"
//           onConfirm={() => {
//             setToast("Action confirmed!");
//             setShowConfirm(false);
//           }}
//           onCancel={() => setShowConfirm(false)}
//         />
//       )}
//       {toast && <Toast message={toast} onClose={() => setToast("")} />}
//     </main>
//   );
// }


"use client";
import React, { useState } from "react";
import HelpDialog from "../components/dialogs/HelpDialog";
import SettingsDialog from "../components/dialogs/SettingsDialog";
import { ConfirmDialog } from "../components/dialogs/ConfirmDialog";
import ResultsDialog from "../components/dialogs/ResultsDialog";
import Toast from "../components/feedback/Toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import useAudio from "../hooks/useAudio"; // ✅ בלי סוגריים

export default function HomePage() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState("");

  const [settings, setSettings] = useLocalStorage<{ sound: boolean; difficulty: "easy" | "medium" | "hard" }>(
    "userSettings",
    { sound: true, difficulty: "medium" }
  );

  const { play } = useAudio("/click.mp3");

  useKeyboardShortcuts({
    h: () => setShowHelp(true),
    s: () => setShowSettings(true),
    r: () => setShowResults(true),
    c: () => setShowConfirm(true),
  });

  // return 
  // <main className="flex flex-col items-center justify-center min-h-screen font-sans text-gray-800 bg-gradient-to-br from-blue-100 via-white to-purple-100">
  //   <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10 w-[90%] sm:w-[600px] text-center border border-gray-200">
  //     <h1 className="mb-6 text-4xl font-extrabold text-blue-700 drop-shadow-sm">
  //       🎮 Educational Games
  //     </h1>
  //     <p className="mb-8 text-lg text-gray-600">
  //       Explore fun interactive games to practice English in a creative way!
  //     </p>

  //     <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
  //       <button
  //         onClick={() => {
  //           play();
  //           setShowHelp(true);
  //         }}
  //         className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-blue-500 shadow-md rounded-xl hover:scale-105 hover:bg-blue-600"
  //       >
  //         Help
  //       </button>

  //       <button
  //         onClick={() => {
  //           play();
  //           setShowSettings(true);
  //         }}
  //         className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-green-500 shadow-md rounded-xl hover:scale-105 hover:bg-green-600"
  //       >
  //         Settings
  //       </button>

  //       <button
  //         onClick={() => {
  //           play();
  //           setShowResults(true);
  //         }}
  //         className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-purple-500 shadow-md rounded-xl hover:scale-105 hover:bg-purple-600"
  //       >
  //         Results
  //       </button>

  //       <button
  //         onClick={() => {
  //           play();
  //           setShowConfirm(true);
  //         }}
  //         className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-red-500 shadow-md rounded-xl hover:scale-105 hover:bg-red-600"
  //       >
  //         Confirm
  //       </button>
  //     </div>

  //     <p className="mt-8 text-sm text-gray-500">
  //       💡 Tip: You can also open dialogs using your keyboard — H / S / R / C
  //     </p>
  //   </div>

  //   {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
  //   {showSettings && (
  //     <SettingsDialog
  //       settings={settings}
  //       onSave={(newSettings) => {
  //         setSettings(newSettings);
  //         setToast("Settings saved!");
  //         setShowSettings(false);
  //       }}
  //       onClose={() => setShowSettings(false)}
  //     />
  //   )}
  //   {showResults && <ResultsDialog score={85} onClose={() => setShowResults(false)} />}
  //   {showConfirm && (
  //     <ConfirmDialog
  //       message="Are you sure?"
  //       onConfirm={() => {
  //         setToast("Action confirmed!");
  //         setShowConfirm(false);
  //       }}
  //       onCancel={() => setShowConfirm(false)}
  //     />
  //   )}
  //   {toast && <Toast message={toast} onClose={() => setToast("")} />}
  // </main>

  // return (
  //   <main className="flex flex-col items-center justify-center min-h-screen font-sans text-gray-800 bg-gradient-to-br from-indigo-100 via-white to-blue-100">
  //     <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 w-[90%] sm:w-[600px] border border-gray-200 text-center animate-fadeIn">
  //       <h1 className="flex items-center justify-center gap-2 mb-3 text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
  //         🎮 Educational Games
  //       </h1>
  //       <p className="mb-8 text-lg text-gray-600">
  //         Explore fun interactive games to practice English in a creative way!
  //       </p>

  //       <div className="grid justify-center grid-cols-2 gap-4">
  //         <button
  //           onClick={() => {
  //             play();
  //             setShowHelp(true);
  //           }}
  //           className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-blue-500 shadow-md rounded-xl hover:scale-105 hover:bg-blue-600"
  //         >
  //           Help
  //         </button>

  //         <button
  //           onClick={() => {
  //             play();
  //             setShowSettings(true);
  //           }}
  //           className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-green-500 shadow-md rounded-xl hover:scale-105 hover:bg-green-600"
  //         >
  //           Settings
  //         </button>

  //         <button
  //           onClick={() => {
  //             play();
  //             setShowResults(true);
  //           }}
  //           className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-purple-500 shadow-md rounded-xl hover:scale-105 hover:bg-purple-600"
  //         >
  //           Results
  //         </button>

  //         <button
  //           onClick={() => {
  //             play();
  //             setShowConfirm(true);
  //           }}
  //           className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-red-500 shadow-md rounded-xl hover:scale-105 hover:bg-red-600"
  //         >
  //           Confirm
  //         </button>
  //       </div>

  //       <p className="mt-8 text-sm text-gray-500">
  //         💡 Tip: You can also open dialogs using your keyboard — H / S / R / C
  //       </p>
  //     </div>

  //     {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
  //     {showSettings && (
  //       <SettingsDialog
  //         settings={settings}
  //         onSave={(newSettings) => {
  //           setSettings(newSettings);
  //           setToast("Settings saved!");
  //           setShowSettings(false);
  //         }}
  //         onClose={() => setShowSettings(false)}
  //       />
  //     )}
  //     {showResults && <ResultsDialog score={85} onClose={() => setShowResults(false)} />}
  //     {showConfirm && (
  //       <ConfirmDialog
  //         message="Are you sure?"
  //         onConfirm={() => {
  //           setToast("Action confirmed!");
  //           setShowConfirm(false);
  //         }}
  //         onCancel={() => setShowConfirm(false)}
  //       />
  //     )}
  //     {toast && <Toast message={toast} onClose={() => setToast("")} />}
  //   </main>
  // );

  return (
  <>
    <main className="flex flex-col items-center justify-center min-h-screen font-sans text-gray-800 bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-10 w-[90%] sm:w-[600px] border border-gray-200 text-center animate-fadeIn">
        <h1 className="flex items-center justify-center gap-2 mb-3 text-4xl font-extrabold text-indigo-700 drop-shadow-sm">
          🎮 Educational Games
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Explore fun interactive games to practice English in a creative way!
        </p>

        <div className="grid justify-center grid-cols-2 gap-4">
          <button
            onClick={() => {
              play();
              setShowHelp(true);
            }}
            className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-blue-500 shadow-md rounded-xl hover:scale-105 hover:bg-blue-600"
          >
            Help
          </button>

          <button
            onClick={() => {
              play();
              setShowSettings(true);
            }}
            className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-green-500 shadow-md rounded-xl hover:scale-105 hover:bg-green-600"
          >
            Settings
          </button>

          <button
            onClick={() => {
              play();
              setShowResults(true);
            }}
            className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-purple-500 shadow-md rounded-xl hover:scale-105 hover:bg-purple-600"
          >
            Results
          </button>

          <button
            onClick={() => {
              play();
              setShowConfirm(true);
            }}
            className="px-5 py-3 font-semibold text-white transition-transform duration-200 bg-red-500 shadow-md rounded-xl hover:scale-105 hover:bg-red-600"
          >
            Confirm
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          💡 Tip: You can also open dialogs using your keyboard — H / S / R / C
        </p>
      </div>
    </main>

    {/* 🟢 דיאלוגים מחוץ לתיבה הראשית! */}
    {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
    {showSettings && (
      <SettingsDialog
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          setToast("Settings saved!");
          setShowSettings(false);
        }}
        onClose={() => setShowSettings(false)}
      />
    )}
    {showResults && <ResultsDialog score={85} onClose={() => setShowResults(false)} />}
    {showConfirm && (
      <ConfirmDialog
        message="Are you sure?"
        onConfirm={() => {
          setToast("Action confirmed!");
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    )}
    {toast && <Toast message={toast} onClose={() => setToast("")} />}
  </>
);





  // return (
  //   <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 bg-gray-100">
  //     <h1 className="mb-4 text-3xl font-bold">Educational Games</h1>

  //     <div className="flex gap-4">
  //       <button onClick={() => { play(); setShowHelp(true); }} className="px-4 py-2 text-white bg-blue-500 rounded">
  //         Help
  //       </button>
  //       <button onClick={() => { play(); setShowSettings(true); }} className="px-4 py-2 text-white bg-green-500 rounded">
  //         Settings
  //       </button>
  //       <button onClick={() => { play(); setShowResults(true); }} className="px-4 py-2 text-white bg-purple-500 rounded">
  //         Results
  //       </button>
  //       <button onClick={() => { play(); setShowConfirm(true); }} className="px-4 py-2 text-white bg-red-500 rounded">
  //         Confirm
  //       </button>
  //     </div>

  //     {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
  //     {showSettings && (
  //       <SettingsDialog
  //         settings={settings}
  //         onSave={(newSettings) => { setSettings(newSettings); setToast("Settings saved!"); setShowSettings(false); }}
  //         onClose={() => setShowSettings(false)}
  //       />
  //     )}
  //     {showResults && <ResultsDialog score={85} onClose={() => setShowResults(false)} />}
  //     {showConfirm && (
  //       <ConfirmDialog
  //         message="Are you sure?"
  //         onConfirm={() => { setToast("Action confirmed!"); setShowConfirm(false); }}
  //         onCancel={() => setShowConfirm(false)}
  //       />
  //     )}
  //     {toast && <Toast message={toast} onClose={() => setToast("")} />}
  //   </main>
  // );
}
