import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    badge?: string;
    onClick?: () => void
}

export function ServiceCard({ icon, title, badge, onClick }: ServiceCardProps) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className={cn(
                "w-full border-none shadow-none bg-transparent hover:bg-accent/50 transition-colors mb-6 flex flex-col items-center justify-center"
            )}
        >
            <div className="relative inline-block">
                <div className="w-10 flex items-center justify-center text-primary">
                    {icon}
                </div>
                {badge && (
                    <span className="absolute -top-4 -right-2 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded-md">
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-xs font-medium text-muted-foreground text-center">
                {title}
            </p>
        </Button>
    );
}