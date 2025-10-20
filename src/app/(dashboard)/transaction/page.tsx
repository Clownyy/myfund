"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Toolbar, Transaction } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { DialogIncome } from "@/components/pop-up/popup-income";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";
import { CardList } from "@/components/card-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerIncome } from "@/components/pop-up/drawer-income";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CardListSkeleton } from "@/components/card-list-skeleton";

const columns: ColumnDef<Transaction>[] = [
    {
        header: 'Description',
        accessorKey: 'notes',
    },
    {
        header: 'Quantity',
        accessorKey: 'amount',
        size: 10,
        cell: ({ row }) => {
            return formatCurrency(row.original.amount);
        }
    },
    {
        header: 'Type',
        accessorKey: 'type',
        cell: ({ row }) => {
            const { type } = row.original;
            const { label, variant } = typeMap[type] || {};
            return <Badge variant={variant || "outline"}>{label || type}</Badge>;
        }
    },
    {
        header: 'Transaction Date',
        accessorKey: 'date',
        cell: ({ row }) => {
            return formatDate(row.original.date);
        }
    },
    {
        header: 'Price',
        accessorKey: 'price',
        cell: ({ row }) => {
            return formatCurrency(row.original.price);
        }
    },
    {
        header: 'Amount',
        accessorKey: 'transactionAmount',
        cell: ({ row }) => {
            const amount = row.original.amount * row.original.price;
            return formatCurrency(amount);
        }
    },
    {
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
            return formatDateTime(row.original.createdAt);
        }
    }
]

const typeMap: Record<string, { label: string; variant: "success" | "destructive" | "default" }> = {
    INCOME: { label: "Income", variant: "success" },
    EXPENSE: { label: "Expense", variant: "destructive" },
    SAVING: { label: "Saving", variant: "default" },
};

export default function TransactionHistory() {
    const toolbar: Toolbar[] = [
        {
            name: 'Income',
            icon: 'Download',
            onClick: () => {
                openDialog('INCOME', createData);
            },
        },
        {
            name: 'Expense',
            icon: 'Upload',
            onClick: () => {
                openDialog('EXPENSE', createData);
            },
        },
        {
            name: 'Saving',
            icon: 'DollarSign',
            onClick: () => {
                openDialog('SAVING', createData);
            },
        },
        {
            name: 'Saving Out',
            icon: 'DollarSign',
            onClick: () => {
                openDialog('SAVINGOUT', createData);
            },
        }
    ]

    async function createData(dataSubmit: unknown) {
        mutate(dataSubmit, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cash-pos'] });
                closeDialog();
            }
        })
    }

    const queryClient = useQueryClient();
    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading } = useQueryApi('transactions', 'transactions', 'GET');
    const { mutate } = useQueryApi('transactions', 'transactions', 'POST');

    if (isLoading) { return <CardListSkeleton row={10} /> };
    return (
        <>
            <Card className="@container/card">
                <CardContent>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Transaction History Data
                        </span>
                    </CardDescription>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex">
                        </div>
                        <div className="flex">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant={"ghost"}
                                        className="h-8"
                                    >
                                        <LucideIcons.Ellipsis size={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {toolbar?.length ? toolbar.map(({ name, icon, onClick }, index) => {
                                        const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon ?? LucideIcons.Circle;
                                        return (
                                            <DropdownMenuItem key={index}>
                                                <Button
                                                    key={index}
                                                    size="sm"
                                                    variant={"ghost"}
                                                    className="h-8"
                                                    onClick={onClick}
                                                >
                                                    <Icon size={20} className="" />
                                                    {name}
                                                </Button>
                                            </DropdownMenuItem>
                                        )
                                    }) : ""}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <ScrollArea className="h-150 w-full p-1">
                        <div className="space-y-4">
                            <CardList
                                data={data}
                            />
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
            {isOpen && <DrawerIncome />}
        </>
    )
}