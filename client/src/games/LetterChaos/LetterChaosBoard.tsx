import { DraggableItem } from "@/hooks/useDragAndDrop";
import { motion } from "framer-motion";

interface LetterChaosBoardProp {
  selectedSlots: (DraggableItem | null)[];
  status: "idle" | "success" | "error";
  handleDrop: (e: React.DragEvent<HTMLElement>, index: number) => void;
  handleDeselectItem: (item: DraggableItem, index: number) => void;
}

export default function LetterChaosBoard({
  selectedSlots,
  status,
  handleDrop,
  handleDeselectItem,
}: LetterChaosBoardProp) {
  return (
    <div className="letter-chaos__board flex flex-wrap justify-center gap-3 mb-4">
      {selectedSlots.map((slot, index) => (
        <motion.div
          key={slot?.id ?? index} //אם ל-סלוט יש אי-די קח אותו אם אין לו קח את האינדקס
          className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-lg border-2 cursor-pointer select-none ${
            status === "success"
              ? "bg-emerald-100 text-emerald-800 border-emerald-500"
              : status === "error"
              ? "bg-red-100 text-red-800 border-red-500"
              : slot
              ? "bg-white text-slate-900 border-slate-700"
              : "bg-gray-200 text-gray-500 border-gray-400"
          } letter-pop`}
          onDrop={(e) => handleDrop(e, index)} //מטפל בהכנסת אות לתיבה
          onDragOver={(e) => e.preventDefault()} //חיב להיות כדי שלמעלה יעבוד, מונע רינדור
          onClick={() => slot && handleDeselectItem(slot, index)} //אם יש אות בתיבה מאפשר להסיר אותה
          initial={false} //אנימציה
          animate={{ scale: 1, opacity: 1 }} //אנימציה
          transition={{ duration: 0.2 }} //אנימציה
        >
          {slot?.value} {/* מציג את האות */}
        </motion.div>
      ))}
    </div>
  );
}
