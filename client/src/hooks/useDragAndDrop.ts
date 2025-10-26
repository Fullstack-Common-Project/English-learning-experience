import { useState, useCallback, useEffect } from "react";

export interface DraggableItem {
  id: string | number;
  value: string;
}

export function useDragAndDrop<T extends DraggableItem>(
  initialItems: T[],
  slotCount: number,
  paused: boolean = false,
  status: "idle" | "success" | "error" = "idle"
) {
  const [availableItems, setAvailableItems] = useState<T[]>(initialItems);
  const [selectedSlots, setSelectedSlots] = useState<(T | null)[]>(() =>
    Array(slotCount).fill(null)
  );
  const [draggedItem, setDraggedItem] = useState<T | null>(null);

  // --- עדכון כאשר מתחלפת מילה (רק אם אכן יש שינוי ממשי) ---
  useEffect(() => {
    const hasChanged =
      initialItems.length !== availableItems.length ||
      initialItems.some((item, i) => item.id !== availableItems[i]?.id);

    if (hasChanged) {
      setAvailableItems(initialItems);
      setSelectedSlots(Array(slotCount).fill(null));
      setDraggedItem(null);
    }
  }, [initialItems, slotCount]);

  // --- פונקציות גרירה ---
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLElement>, item: T) => {
      if (!paused && status === "idle") {
        setDraggedItem(item);
        e.dataTransfer.setData("text/plain", JSON.stringify(item));
      }
    },
    [paused, status]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>, targetIndex: number) => {
      e.preventDefault();
      if (paused || !draggedItem || status !== "idle") return;
      if (selectedSlots[targetIndex] !== null) return;

      setSelectedSlots((prev) => {
        const newSlots = [...prev];
        newSlots[targetIndex] = draggedItem;
        return newSlots;
      });

      setAvailableItems((prev) =>
        prev.filter((item) => item.id !== draggedItem.id)
      );
      setDraggedItem(null);
    },
    [draggedItem, paused, selectedSlots, status]
  );

  const handleItemSelect = (item: T) => {
    const emptyIndex = selectedSlots.findIndex((slot) => slot === null);
    if (emptyIndex === -1) return;

    setSelectedSlots((prev) => {
      const newSlots = [...prev];
      newSlots[emptyIndex] = item;
      return newSlots;
    });

    setAvailableItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleDeselectItem = (item: T, index: number) => {
    setSelectedSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = null;
      return newSlots;
    });

    setAvailableItems((prev) => [...prev, item]);
  };

  return {
    availableItems,
    selectedSlots,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleItemSelect,
    handleDeselectItem,
    setAvailableItems,
    setSelectedSlots,
    setDraggedItem,
  };
}
