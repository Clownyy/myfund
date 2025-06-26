// components/ui/confirm-dialog.tsx
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useConfirmStore } from "@/stores/confirm-store";

export const ConfirmDialog = () => {
    const { isOpen, message, onConfirm, closeConfirm } = useConfirmStore();

    const handleConfirm = () => {
        onConfirm();
        closeConfirm();
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeConfirm}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={closeConfirm}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>Yes, Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
