"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddOn, Toolbar } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { confirmAlert } from "@/lib/confirm-alert";
import { formatCurrency } from "@/lib/utils";
import { DialogInvoice } from "@/components/pop-up/popup-invoice";
import { Badge } from "@/components/ui/badge";
import { useQueryClient } from "@tanstack/react-query";

const columns: ColumnDef<any>[] = [
    {
        header: 'Bill Name',
        accessorKey: 'billName',
    },
    {
        header: 'Amount',
        accessorKey: 'billAmount',
        cell: ({ row }) => {
            const amount = row.original.billAmount;
            return formatCurrency(amount)
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
        header: 'Freq',
        accessorKey: 'frequency',
        cell: ({ row }) => {
            const { frequency, currFreq } = row.original;
            return `${currFreq} / ${frequency}`
        }
    },
    {
        header: 'Active',
        accessorKey: 'active',
        size: 10
    }
]

const typeMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
    MONTHLY: { label: "Monthly", variant: "default" },
    WEEKLY: { label: "Weekly", variant: "secondary" },
    ONCE: { label: "Once", variant: "destructive" },
};

export default function Bill() {
    const addOns: AddOn[] = [
        {
            name: 'Edit',
            icon: 'Pencil',
            onClick: (row) => openPopup(row.original),
        },
        {
            name: 'Delete',
            icon: 'Trash',
            onClick: (row) => deleteData(row.original),
        },
    ]

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
                                queryClient.invalidateQueries({ queryKey: ['next-invoice'] });
                            }
                        });
                    }
                })
            }
        }
    ]
    function openPopup(data?: any) {
        if (data) {
            openDialog(data, updateData);
        } else {
            openDialog({}, createData);
        }
    }

    async function createData(dataSubmit: any) {
        mutate(dataSubmit, {
            onSuccess: () => {
                closeDialog();
            }
        })
    }
    async function updateData(data: any) {
        data = { ...data, id: data.id };
        updateMutate(data, {
            onSuccess: () => {
                closeDialog();
            }
        })
    }

    async function deleteData(data: any) {
        confirmAlert({
            message: "This action cannot be undone. This will permanently delete your data from our servers",
            onConfirm: () => {
                deleteMutate(data.id, {
                    onSuccess: () => {
                        closeDialog();
                    }
                })
            }
        })
    }

    const queryClient = useQueryClient();
    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading, error } = useQueryApi('bill-templates', 'bill-templates', 'GET');
    const { mutate } = useQueryApi('bill-templates', 'bill-templates', 'POST');
    const { mutate: updateMutate } = useQueryApi('bill-templates', 'bill-templates', 'PATCH');
    const { mutate: deleteMutate } = useQueryApi('bill-templates', 'bill-templates', 'DELETE');
    const { mutate: generateMutate } = useQueryApi('generate-bills', 'bills', 'POST');

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Invoice</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Invoice Data
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        toolbar={toolbar}
                        columns={columns}
                        data={data}
                        addOns={addOns}
                        allowSelection
                    />
                </CardContent>
            </Card>
            {isOpen && <DialogInvoice />}
        </>
    )
}