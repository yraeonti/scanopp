import { create } from "zustand";

type editTransaction = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useEditTransaction = create<editTransaction>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id = "") => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
