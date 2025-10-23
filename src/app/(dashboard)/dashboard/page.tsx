"use client";
import { SectionCards } from "@/components/section-cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardList } from "@/components/card-list";
import { useQueryApi } from "@/hooks/use-query";
import { CardListSkeleton } from "@/components/card-list-skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { ServiceCard } from "@/components/service-card";
import {
    ArrowDownToLine,
    ArrowUpToLine,
    DollarSign,
    PiggyBank,
} from "lucide-react";
import { useDialogStore } from "@/stores/dialog-store";
import { useQueryClient } from "@tanstack/react-query";
import { DrawerIncome } from "@/components/pop-up/drawer-income";

export default function Page() {
    const services = [
        {
            icon: <ArrowDownToLine />,
            title: "Income",
            onClick: () => {
                openDialog("INCOME", createData);
            },
        },
        {
            icon: <ArrowUpToLine />,
            title: "Expense",
            onClick: () => {
                openDialog("EXPENSE", createData);
            },
        },
        {
            icon: <PiggyBank />,
            title: "Saving",
            onClick: () => {
                openDialog("SAVING", createData);
            },
        },
        {
            icon: <DollarSign />,
            title: "Saving Out",
            badge: "New",
            onClick: () => {
                openDialog("SAVINGOUT", createData);
            },
        },
    ];

    async function createData(dataSubmit: unknown) {
        mutate(dataSubmit, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cash-pos"] });
                closeDialog();
            },
        });
    }

    const queryClient = useQueryClient();
    const { isOpen, openDialog, closeDialog } = useDialogStore();
    const { data, isLoading } = useQueryApi(
        "transactions",
        "transactions",
        "GET",
    );
    const { mutate } = useQueryApi("transactions", "transactions", "POST");
    return (
        <>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards />
                        <div className="grid grid-cols-4 gap-2 pt-5">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.title}
                                    icon={service.icon}
                                    title={service.title}
                                    badge={service.badge}
                                    onClick={service.onClick}
                                />
                            ))}
                        </div>
                        {isLoading && <CardListSkeleton row={5} />}
                        {!isLoading && (
                            <Card className="@container/card">
                                <CardContent>
                                    <CardTitle>Transaction History</CardTitle>
                                    <CardDescription>
                                        <span className="hidden @[540px]/card:block">
                                            Transaction History Data
                                        </span>
                                    </CardDescription>
                                    <ScrollArea className="h-100 w-full p-1">
                                        <div className="space-y-4">
                                            <CardList data={data} />
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
            {isOpen && <DrawerIncome />}
        </>
    );
}
