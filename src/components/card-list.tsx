import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types/interface";
import { Separator } from "./ui/separator";

export function CardList(data: any) {
    const typeMap: Record<string, { label: string;}> = {
        INCOME: { label: "Income"},
        EXPENSE: { label: "Expense"},
        SAVING: { label: "Saving In"},
        SAVINGOUT: { label: "Saving Out"},
    };
    return (
        data.data.map((item: any) => (
            <div key={item.id}>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="font-medium text-sm">{typeMap[item.type].label}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                    </div>
                    <div className="text-sm text-right mr-2">
                        <p className={cn(
                            "font-medium",
                            item.type === "EXPENSE" || item.type === "SAVINGOUT" ? "text-red-600" : "text-green-600"
                        )}>
                            {item.type === "EXPENSE" || item.type === "SAVINGOUT" ? "-" : "+"}{formatCurrency(item.amount * item.price)}
                        </p>
                    </div>
                </div>
                <Separator />
            </div>
        ))
    );
}