import * as Icons from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type IconSelectorProps = {
    value: string;
    onChange: (value: string) => void;
};

export function IconSelector({ value, onChange }: IconSelectorProps) {
    const icons = [
        "LayoutDashboard",
        "Users",
        "User",
        "Settings",
        "Bell",
        "MessageSquare",
        "BarChart",
        "ChartPie",
        "FileText",
        "Calendar",
        "Search",
        "LogOut",
        "LogIn",
        "Lock",
        "HelpCircle",
        "Home",
        "Package",
        "Sliders",
        "Tags",
        "ShoppingCart",
        "CreditCard",
        "List",
        "ListChecks",
        "ListCollapse",
        "ListTodo",
    ];


    return (
        <ScrollArea className="h-60 w-full border rounded-md p-2">
            <div className="grid grid-cols-5 gap-2">
                {icons.map((name) => {
                    const IconComponent = Icons[name as keyof typeof Icons] as LucideIcon;
                    const isSelected = value === name;

                    return (
                        <button
                            key={name}
                            type="button"
                            onClick={() => onChange(name)}
                            className={cn(
                                "border p-2 rounded hover:bg-accent flex flex-col items-center justify-center gap-1",
                                isSelected && "bg-primary text-white dark:text-primary-foreground"
                            )}
                        >
                            {/* <span className="text-xs truncate max-w-[64px]">{name}</span> */}
                            <IconComponent size={20} />
                        </button>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
