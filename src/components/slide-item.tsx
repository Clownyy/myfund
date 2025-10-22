"use client";
import React, { useState } from "react";
import { motion, PanInfo, useMotionValue, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

type SwipeableItem = {
    id: number;
    transType: any;
    variant: "default" | "destructive" | "secondary" | "success";
    description: string;
    amount: number;
};

export interface SwipeButtonConfig {
    label: string;
    className?: string;
    variant: "default" | "destructive" | "secondary";
}

interface SwipeableListProps {
    items: SwipeableItem[];
    leftButtonConfig?: SwipeButtonConfig;
    rightButtonConfig?: SwipeButtonConfig;
    onLeftButton?: (item: SwipeableItem) => void;
    onRightButton?: (item: SwipeableItem) => void;
}

export const SwipeableList: React.FC<SwipeableListProps> = ({
    items,
    leftButtonConfig,
    rightButtonConfig,
    onLeftButton,
    onRightButton,
}) => {
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const handleAction = (item: SwipeableItem, action: "left" | "right") => {
        setOpenItemId(null);
        if (action === "left") onLeftButton?.(item);
        if (action === "right") onRightButton?.(item);
    };

    return (
        <div className="overflow-hidden shadow-none bg-transparent w-full mt-3">
            <ScrollArea className="h-100 w-full p-1">
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <SwipeableListItem
                            item={item}
                            isOpen={openItemId === item.id}
                            setOpenItemId={setOpenItemId}
                            leftButtonConfig={leftButtonConfig}
                            rightButtonConfig={rightButtonConfig}
                            onAction={handleAction}
                        />
                        {index < items.length - 1 && <Separator />}
                    </React.Fragment>
                ))}
            </ScrollArea>
        </div>
    );
};

interface SwipeableListItemProps {
    item: SwipeableItem;
    isOpen: boolean;
    setOpenItemId: (id: number | null) => void;
    leftButtonConfig?: SwipeButtonConfig;
    rightButtonConfig?: SwipeButtonConfig;
    onAction: (item: SwipeableItem, action: "left" | "right") => void;
}

const SwipeableListItem: React.FC<SwipeableListItemProps> = ({
    item,
    isOpen,
    setOpenItemId,
    leftButtonConfig,
    rightButtonConfig,
    onAction,
}) => {
    const x = useMotionValue(0);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offsetX = info.offset.x;

        if (offsetX > 80 && leftButtonConfig) {
            setOpenItemId(item.id);
            x.set(100);
        } else if (offsetX < -80 && rightButtonConfig) {
            setOpenItemId(item.id);
            x.set(-100);
        } else {
            setOpenItemId(null);
            x.set(0);
        }
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 flex justify-between items-center px-4">
                <div className="pointer-events-auto">
                    {leftButtonConfig && (
                        <Button
                            variant={leftButtonConfig.variant}
                            className={leftButtonConfig.className}
                            onClick={() => onAction(item, "left")}
                        >
                            {leftButtonConfig.label}
                        </Button>
                    )}
                </div>
                <div className="pointer-events-auto">
                    {rightButtonConfig && (
                        <Button
                            variant={rightButtonConfig.variant}
                            className={rightButtonConfig.className}
                            onClick={() => onAction(item, "right")}
                        >
                            {rightButtonConfig.label}
                        </Button>
                    )}
                </div>
            </div>

            <motion.div
                style={{ x, backgroundColor: "var(--card)" }}
                drag={
                    leftButtonConfig && rightButtonConfig
                        ? "x"
                        : leftButtonConfig
                            ? "x"
                            : rightButtonConfig
                                ? "x"
                                : false
                }
                dragConstraints={{
                    left: rightButtonConfig ? -120 : 0,
                    right: leftButtonConfig ? 120 : 0,
                }}
                dragElastic={0.2}
                onDragStart={() => setOpenItemId(item.id)}
                onDragEnd={handleDragEnd}
                animate={{ x: isOpen ? x.get() : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="relative bg-card py-4 text-foreground cursor-grab active:cursor-grabbing select-none pointer-events-auto"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div>
                            <Badge className="font-medium text-xs" variant={item.variant || "outline"}>{item.transType}</Badge>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                    <div className="text-sm text-right mr-2">
                        <p>{formatCurrency(item.amount)}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
