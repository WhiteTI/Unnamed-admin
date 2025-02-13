import {createFileRoute, Outlet} from '@tanstack/react-router'
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/app-sidebar.tsx";

export const Route = createFileRoute('/(app)/_auth/dashboard')({
    component: DashBoard,
})

function DashBoard() {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger/>
                <Outlet/>
            </main>
        </SidebarProvider>
    )
}
