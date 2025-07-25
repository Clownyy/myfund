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

const columns: ColumnDef<Transaction>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
        size: 30
    },
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

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Transaction History Data
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        toolbar={toolbar}
                        columns={columns}
                        data={data}
                        allowSelection
                    />
                </CardContent>
            </Card>
            {isOpen && <DialogIncome />}
        </>
    )
}