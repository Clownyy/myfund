"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddOn, Toolbar } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDialogStore } from "@/stores/dialog-store";
import { DialogSysMenu } from "@/components/pop-up/create-sys-menu";
import { confirmAlert } from "@/lib/confirm-alert";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const columns: ColumnDef<any>[] = [
    {
        header: 'Bill Name',
        accessorKey: 'notes',
    },
    {
        header: 'Amount',
        accessorKey: 'template.billAmount',
        cell: ({ row }) => {
            const amount = row.original.template.billAmount;
            return formatCurrency(amount)
        }
    },
    {
        header: 'Paid',
        accessorKey: 'paid',
        size: 10,

    }
]


export default function YourBill() {
    const addOns: AddOn[] = [
        {
            name: 'Mark as paid',
            icon: 'CircleDollarSign',
            onClick: (row) => disbursement(row.original),
        },
    ]

    async function disbursement(data: any) {
        const balance = queryClient.getQueryData(['cash-pos', 'cash-pos']) as Number;
        if (balance >= data.template.billAmount) {
            disburseMutate(data, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['transactions'] });
                    queryClient.invalidateQueries({ queryKey: ['cash-pos'] });
                }
            })
        } else {
            toast.error(
				"Insufficient Balance",
			);
        }
    }

    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQueryApi('bills', 'bills', 'GET');
    const { mutate } = useQueryApi('bills', 'bills', 'POST');
    const { mutate: updateMutate } = useQueryApi('bills', 'bills', 'PATCH');
    const { mutate: disburseMutate } = useQueryApi('disburse', 'bills', 'PATCH');

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Your Invoice</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Invoice Data
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        addOns={addOns}
                        allowSelection={false}
                    />
                </CardContent>
            </Card>
        </>
    )
}