import { create } from "zustand";

interface DialogState {
    isOpen: boolean;
    data: any;
    onSubmit?: (data: any) => void;
    openDialog: (data: any, onSubmit?: (data: any) => void) => void;
    closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    isOpen: false,
    data: {},
    onSubmit: undefined,
    openDialog: (data, onSubmit) => set({ isOpen: true, data, onSubmit }),
    closeDialog: () => set({ isOpen: false, data: {}, onSubmit: undefined }),
}));
