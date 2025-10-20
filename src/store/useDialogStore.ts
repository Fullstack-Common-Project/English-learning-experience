import { create } from "zustand";

type DialogState = {
  openDialog: string | null;
  open: (name: string) => void;
  close: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
  openDialog: null,
  open: (name) => set({ openDialog: name }),
  close: () => set({ openDialog: null }),
}));
