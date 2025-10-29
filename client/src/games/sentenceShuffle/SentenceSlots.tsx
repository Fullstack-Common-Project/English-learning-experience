import { motion } from "framer-motion";
import { DraggableItem } from "@/hooks/useDragAndDrop";

interface SentenceSlotsProps {
  status: "idle" | "success" | "error";
  selectedSlots: (DraggableItem | null)[];
  handleDrop: (e: React.DragEvent<HTMLElement>, i: number) => void;
  handleDeselectItem: (item: DraggableItem, index: number) => void;
}

export default function SentenceSlots({
  status,
  selectedSlots,
  handleDrop,
  handleDeselectItem,
}: SentenceSlotsProps) {
  return (
    <div className="mb-6 grid grid-cols-1">
      <div className="flex flex-wrap justify-center gap-3">
        {selectedSlots.map((slot, i) => (
          <motion.div
            key={slot?.id ?? `slot-${i}`}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`min-w-[90px] px-3 py-2 rounded-lg border-2 text-lg font-semibold flex items-center justify-center text-center
              ${
                status === "success"
                  ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                  : status === "error"
                  ? "bg-red-100 border-red-500 text-red-800"
                  : slot
                  ? "bg-white border-slate-500 text-slate-800 cursor-pointer"
                  : "bg-gray-200 border-gray-300 text-gray-500"
              }`}
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => slot && handleDeselectItem(slot, i)}
          >
            {slot?.value}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
