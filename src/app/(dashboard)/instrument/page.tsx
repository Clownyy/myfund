"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddOn, InstrumentData, Toolbar } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { confirmAlert } from "@/lib/confirm-alert";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { DialogInstrument } from "@/components/pop-up/popup-instrument";
import { useQueryClient } from "@tanstack/react-query";

const columns: ColumnDef<InstrumentData>[] = [
    {
        header: 'Instrument Code',
        accessorKey: 'instrumentCode',
        size: 30
    },
    {
        header: 'Instrument Name',
        accessorKey: 'instrumentName',
    },
    {
        header: 'Buy Price',
        accessorKey: 'buyPrice',
        cell: ({ row }) => {
            const amount = row.original.buyPrice;
            return formatCurrency(amount)
        }
    },
    {
        header: 'Sell Price',
        accessorKey: 'sellPrice',
        cell: ({ row }) => {
            const amount = row.original.sellPrice;
            return formatCurrency(amount)
        }
    },
    {
        header: 'Created At', 
        accessorKey: 'createdAt',
        cell: ({ row }) => {
            const date = row.original.createdAt;
            return formatDateTime(date)
        }
    },
    {
        header: 'Updated At', 
        accessorKey: 'updatedAt',
        cell: ({ row }) => {
            const date = row.original.updatedAt;
            return formatDateTime(date)
        }
    }
]


export default function Instrument() {
    const addOns: AddOn[] = [
        {
            name: 'Edit',
            icon: 'Pencil',
            onClick: (row: unknown) => openPopup((row as { original: unknown }).original),
        },
        {
            name: 'Delete',
            icon: 'Trash',
            onClick: (row) => deleteData((row as { original: unknown }).original),
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

    async function deleteData(data: unknown) {
        confirmAlert({
            message: "This action cannot be undone. This will permanently delete your data from our servers",
            onConfirm: () => {
                deleteMutate((data as { id: string }).id, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['savings'] });
                        closeDialog();
                    }
                })
            }
        })
    }

    const queryClient = useQueryClient();
    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading } = useQueryApi('instruments', 'instruments', 'GET');
    const { mutate } = useQueryApi('instruments', 'instruments', 'POST');
    const { mutate: updateMutate } = useQueryApi('instruments', 'instruments', 'PATCH');
    const { mutate: deleteMutate } = useQueryApi('instruments', 'instruments', 'DELETE');

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Instrument</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Instrument Data
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
            {isOpen && <DialogInstrument />}
        </>
    )
}