"use client";
import { Bill } from "@/types/interface";
import { useQueryApi } from "@/hooks/use-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SwipeableList, SwipeButtonConfig } from "@/components/slide-item";
import { CardListSkeleton } from "@/components/card-list-skeleton";


export default function YourBill() {

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

    const items = data?.map((item: any) => ({ ...item, transType: item.paid ? "Paid" : "Unpaid", variant: item.paid ? "success" : "destructive", description: item.notes, amount: item.template.billAmount }))
    const paidButton: SwipeButtonConfig = {
        label: "Paid",
        variant: "default",
    };
    if (isLoading) { return <CardListSkeleton row={5} /> };
    return (
        <>
            <Card className="@container/card">
                <CardContent>
                    <CardTitle>Your Bill</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Invoice Data
                        </span>
                    </CardDescription>
                    <SwipeableList
                        items={items}
                        leftButtonConfig={paidButton}
                        rightButtonConfig={paidButton}
                        onLeftButton={(item: any) => disbursement(item)}
                        onRightButton={(item: any) => disbursement(item)}
                    />
                </CardContent>
            </Card>
        </>
    )
}