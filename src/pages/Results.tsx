// import React, { useState } from "react";
// import { ResultsDialog } from "../components/dialogs/ResultsDialog";
// import { Toast } from "../components/feedback/Toast";
// import { useAudio } from "../hooks/useAudio";

// export default function Results() {
//   const [open, setOpen] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const { play } = useAudio("/success.mp3"); // שימי קובץ סאונד בתיקייה public

//   const handleShowResults = () => {
//     play();
//     setOpen(true);
//     setShowToast(true);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-3">מסך תוצאות</h1>
//       <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleShowResults}>
//         הצג תוצאות
//       </button>
//       {open && <ResultsDialog score={85} onClose={() => setOpen(false)} />}
//       {showToast && <Toast message="כל הכבוד! סיימת את המשחק 🎉" />}
//     </div>
//   );
// }


import React, { useState } from "react";
import ResultsDialog from "../components/dialogs/ResultsDialog"; // ✅ בלי סוגריים
import Toast from "../components/feedback/Toast"; // ✅ בלי סוגריים
import { useAudio } from "../hooks/useAudio";

export default function Results() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { play } = useAudio("/success.mp3"); // הקובץ public/success.mp3

  const handleShowResults = () => {
    play();
    setOpen(true);
    setShowToast(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">מסך תוצאות</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleShowResults}
      >
        הצג תוצאות
      </button>

      {open && <ResultsDialog score={85} onClose={() => setOpen(false)} />}
      {showToast && (
        <Toast message="כל הכבוד! סיימת את המשחק 🎉" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
