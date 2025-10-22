"use client";
import { AddOn, BillTemplate, Toolbar } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { confirmAlert } from "@/lib/confirm-alert";
import { DialogInvoice } from "@/components/pop-up/popup-invoice";
import { useQueryClient } from "@tanstack/react-query";
import { SwipeableList, SwipeButtonConfig } from "@/components/slide-item";
import { CardListSkeleton } from "@/components/card-list-skeleton";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

const typeMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
    MONTHLY: { label: "Monthly", variant: "default" },
    WEEKLY: { label: "Weekly", variant: "secondary" },
    ONCE: { label: "Once", variant: "destructive" },
};

export default function Bill() {
    const editButton: SwipeButtonConfig = {
        label: "Edit",
        variant: "secondary",
    };
    const deleteButton: SwipeButtonConfig = {
        label: "Delete",
        variant: "destructive",
    };

    const toolbar: Toolbar[] = [
        {
            name: 'Create',
            icon: 'Plus',
            onClick: () => openPopup(),
        },
        {
            name: 'Generate Bill',
            icon: 'CreditCard',
            onClick: () => {
                confirmAlert({
                    message: "This action cannot be undone. This will permanently delete your data from our servers",
                    onConfirm: () => {
                        generateMutate({}, {
                            onSuccess: () => {
                                queryClient.invalidateQueries({ queryKey: ['current-invoice'] });
                                queryClient.invalidateQueries({ queryKey: ['bill-templates'] });
                            }
                        });
                    }
                })
            }
        }
    ]
    function openPopup(data?: unknown) {
        if (data) {
            openDialog(data, updateData);
        } else {
            openDialog({}, createData);
        }
    }

    async function createData(dataSubmit: unknown) {
        mutate(dataSubmit, {
            onSuccess: () => {
                closeDialog();
            }
        })
    }
    async function updateData(data: unknown) {
        if (typeof data === 'object' && data !== null) {
            updateMutate(data, {
                onSuccess: () => {
                    closeDialog();
                }
            })
        }
    }

    async function deleteData(data: unknown) {
        confirmAlert({
            message: "This action cannot be undone. This will permanently delete your data from our servers",
            onConfirm: () => {
                deleteMutate((data as { id: string }).id, {
                    onSuccess: () => {
                        closeDialog();
                    }
                })
            }
        })
    }

    const queryClient = useQueryClient();
    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading } = useQueryApi('bill-templates', 'bill-templates', 'GET');
    const { mutate } = useQueryApi('bill-templates', 'bill-templates', 'POST');
    const { mutate: updateMutate } = useQueryApi('bill-templates', 'bill-templates', 'PATCH');
    const { mutate: deleteMutate } = useQueryApi('bill-templates', 'bill-templates', 'DELETE');
    const { mutate: generateMutate } = useQueryApi('generate-bills', 'bills', 'POST');


    const items = data?.map((item: any) => ({
        ...item,
        transType: typeMap[item.type].label,
        variant: typeMap[item.type].variant,
        description: item.billName + " " + item.currFreq + " / " + item.frequency,
        amount: item.billAmount
    }))

    if (isLoading) { return <CardListSkeleton row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardContent>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Billing Data
                        </span>
                    </CardDescription>
                    <div className="flex items-center justify-between">
                        <div className="flex">
                        </div>
                        <div className="flex">
                            {toolbar?.length ? toolbar.map(({ name, icon, onClick }, index) => {
                                const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
                                return (
                                    <Button
                                        key={index}
                                        size="sm"
                                        variant={"ghost"}
                                        onClick={onClick}
                                    >
                                        <Icon size={20} className="" />
                                        {name}
                                    </Button>
                                )
                            }) : ""}
                        </div>
                    </div>
                    <SwipeableList
                        items={items}
                        leftButtonConfig={editButton}
                        rightButtonConfig={deleteButton}
                        onLeftButton={(item: any) => openPopup(item)}
                        onRightButton={(item: any) => deleteData(item)}
                    />
                </CardContent>
            </Card>
            {isOpen && <DialogInvoice />}
        </>
    )
}