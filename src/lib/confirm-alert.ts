// lib/confirm-alert.ts
import { useConfirmStore } from "@/stores/confirm-store";

export const confirmAlert = (options: {
    message: string;
    onConfirm: () => void;
}) => {
    useConfirmStore.getState().openConfirm(options);
};
