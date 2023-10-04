import { create } from 'zustand'

interface useStoreModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useStoreModal = create<useStoreModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true })
}))
