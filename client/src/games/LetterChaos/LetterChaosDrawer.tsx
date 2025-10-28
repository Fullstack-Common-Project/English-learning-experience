import { DraggableItem } from "@/hooks/useDragAndDrop";
import { motion, AnimatePresence } from "framer-motion";

interface LetterChaosDrawerProp {
  availableItems: DraggableItem[];
  draggedItem: DraggableItem | null;
  paused: boolean;
  handleItemSelect: (item: DraggableItem) => void;
  handleDragStart: (e: React.DragEvent<HTMLElement>, item: DraggableItem) => void;
  handleDragEnd: () => void;
}

export default function LetterChaosDrawer({
  availableItems,
  draggedItem,
  paused,
  handleItemSelect,
  handleDragStart,
  handleDragEnd,
}: LetterChaosDrawerProp) {
  return (
    <motion.div className="letter-chaos__drawer flex flex-wrap justify-center gap-3 mt-4">
      <AnimatePresence>
        {availableItems.map((item) => {
          const isDragged = draggedItem?.id === item.id; //בודק אם האות האת נגררת מחזיר - אמת או שקר
          return (
            <motion.button
              key={item.id}
              className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-lg border-2 transition-transform duration-200 ${
                isDragged
                  ? "scale-110 shadow-lg border-indigo-400 bg-indigo-100"
                  : "bg-white text-indigo-700 border-indigo-500"
              } ${paused ? "cursor-not-allowed" : "cursor-grab"} letter-pop`}
              draggable={!paused} // האם ניתן לגרור את הכפתור
              disabled={paused} // אם המשחקpaused, הכפתור לא פעיל
              onClick={() => handleItemSelect(item)} // לחיצה בוחר את האות
              onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLElement>, item)}
              onDragEnd={handleDragEnd} // סיום גרירה
              initial={false} //אנימציה
              animate={{ scale: 1, opacity: 1 }} //אנימציה
              exit={{ scale: 0, opacity: 0 }} //אנימציה
              transition={{ type: "spring", stiffness: 500, damping: 30 }} //אנימציה
            >
              {item.value}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
