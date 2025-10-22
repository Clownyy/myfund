import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types/interface";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

export function CardListSkeleton({ row }: { row: number }) {
    const rowCount = Array(row).fill(0);
    return (
        <>
            <Card className="@container/card">
                <CardContent>
                    <CardTitle>Data</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Data
                        </span>
                    </CardDescription>
                </CardContent>
                {
                    rowCount.map((_, rowIndex) => (
                        <div key={rowIndex}>
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-30" />
                                    </div>
                                </div>
                                <div className="text-sm text-right mr-2">
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                            <Separator />
                        </div>
                    ))
                }
            </Card>
        </>
    );
}