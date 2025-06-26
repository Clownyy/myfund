"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddOn, SavingData,Toolbar } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { confirmAlert } from "@/lib/confirm-alert";
import { formatCurrency } from "@/lib/utils";
import { DialogSaving } from "@/components/pop-up/popup-saving";

const columns: ColumnDef<SavingData>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
        size: 10
    },
    {
        header: 'Instrument Name',
        accessorKey: 'instrument.instrumentName'
    },
    {
        header: 'Quantity',
        accessorKey: 'amount'
    },
    {
        header: 'Amount',
        accessorKey: 'totalAmount',
        cell: ({ row }) => {
            const amount = row.original.amount * row.original.instrument.sellPrice;

            return formatCurrency(amount);
        }
    },
]


export default function Saving() {
    const addOns: AddOn[] = [
        {
            name: 'Edit',
            icon: 'Pencil',
            onClick: (row) => openPopup((row as { original: SavingData }).original),
        },
        {
            name: 'Delete',
            icon: 'Trash',
            onClick: (row) => deleteData((row as { original: SavingData }).original),
        },
    ]

    const toolbar: Toolbar[] = [
        {
            name: 'Create',
            icon: 'Plus',
            onClick: () => openPopup(),
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
        updateMutate(data, {
            onSuccess: () => {
                closeDialog();
            }
        })
    }

    async function deleteData(data: SavingData) {
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

    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading } = useQueryApi('savings', 'savings', 'GET');
    const { mutate } = useQueryApi('savings', 'savings', 'POST');
    const { mutate: updateMutate } = useQueryApi('savings', 'savings', 'PATCH');
    const { mutate: deleteMutate } = useQueryApi('savings', 'savings', 'DELETE');

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Saving</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Saving Data
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
            {isOpen && <DialogSaving />}
        </>
    )
}