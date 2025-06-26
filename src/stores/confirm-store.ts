// stores/confirm-store.ts
import { create } from "zustand";

type ConfirmOptions = {
    message: string;
    onConfirm: () => void;
};

type ConfirmStore = {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    openConfirm: (options: ConfirmOptions) => void;
    closeConfirm: () => void;
};

export const useConfirmStore = create<ConfirmStore>((set) => ({
    isOpen: false,
    message: "",
    onConfirm: () => { },
    openConfirm: ({ message, onConfirm }) =>
        set({ isOpen: true, message, onConfirm }),
    closeConfirm: () => set({ isOpen: false }),
}));
