import {createFileRoute, Outlet} from '@tanstack/react-router'
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/app-sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export const Route = createFileRoute('/(app)/_auth/dashboard')({
    component: DashBoard,
})

function DashBoard() {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-10'>
                    <SidebarTrigger/>
                    <Separator orientation='vertical' className='mr-2 h-4'/>
                    <div>(～￣▽￣)～</div>
                </header>
                <div className='p-4'>
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
