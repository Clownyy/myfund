import { AppSidebar } from "@/components/app-sidebar";
import { SidebarBottomNav } from "@/components/sidebar-bottom-nav";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 16)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset className="pb-20">
                <div className="sticky top-0 z-50">
                    <SiteHeader />
                </div>
                <div className="flex flex-1 flex-col overflow-auto pt-4 md:pt-8 md:pb-8 px-5 lg:px-12">
                    {children}
                </div>
            </SidebarInset>
            <SidebarBottomNav />
        </SidebarProvider>
    )
}