import { create } from "zustand";

interface useStoreModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: true }),
  onOpen: () => set({ isOpen: false }),
}));
