"use client";
import React, { useState } from "react";
import { motion, PanInfo, useMotionValue, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

type SwipeableItem = {
    id: number;
    transType: string;
    variant: "default" | "destructive" | "secondary";
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

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
    ) => {
        const offsetX = info.offset.x;
        const velocity = info.velocity.x;

        // smooth spring return
        const animateTo = (target: number) =>
            animate(x, target, {
                type: "spring",
                stiffness: 250,
                damping: 25,
                mass: 0.7,
            });

        if (offsetX > 80 || velocity > 400) {
            setOpenItemId(item.id);
            animateTo(100);
        } else if (offsetX < -80 || velocity < -400) {
            setOpenItemId(item.id);
            animateTo(-100);
        } else {
            setOpenItemId(null);
            animateTo(0);
        }
    };

    return (
        <div className="relative">
            {/* Background buttons */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
                {leftButtonConfig && (
                    <Button
                        variant={leftButtonConfig.variant}
                        className={leftButtonConfig.className}
                        onClick={() => onAction(item, "left")}
                    >
                        {leftButtonConfig.label}
                    </Button>
                )}
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

            {/* Foreground draggable card */}
            <motion.div
                style={{ x, backgroundColor: "var(--card)" }}
                drag="x"
                dragConstraints={{ left: -120, right: 120 }}
                dragElastic={0.25}
                onDragStart={() => setOpenItemId(item.id)}
                onDragEnd={handleDragEnd}
                animate={{
                    x: isOpen ? (x.get() > 0 ? 100 : -100) : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 30,
                    mass: 0.7,
                }}
                className="relative bg-card py-4 text-foreground cursor-grab active:cursor-grabbing select-none pointer-events-auto"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center ml-2">
                        <div>
                            <Badge
                                variant={item.variant || "outline"}
                                className="font-medium text-sm"
                            >
                                {item.transType}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                                {item.description}
                            </p>
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
