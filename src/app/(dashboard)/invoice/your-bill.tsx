"use client";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AddOn, Bill } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const columns: ColumnDef<Bill>[] = [
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
            onClick: (row) => disbursement((row as { original: Bill }).original),
        },
    ]

    async function disbursement(data: Bill) {
        const balance = dataBalance.amount;
        const balanceNum = Number(balance);
        const amountNum = Number(data.template.billAmount);
        if (balanceNum >= amountNum) {
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
    const { data, isLoading } = useQueryApi('bills', 'bills', 'GET');
    const { data: dataBalance } = useQueryApi('cash-pos', 'cash-pos', 'GET');
    const { mutate: disburseMutate } = useQueryApi('disburse', 'bills', 'PATCH');

    if (isLoading) { return <DataTableSkeleton columns={columns} row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Your Bill</CardTitle>
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