import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import NavUser from "@/components/sidebar/nav-user.tsx";
import NavGames from "@/components/sidebar/nav-games.tsx";
import NavMenu from "@/components/sidebar/nav-menu.tsx";
import logo from '@/assets/img/logo.jpg'

const AppSidebar = () => {

    return (
        <Sidebar collapsible='offcanvas'>
            <SidebarHeader className='flex-row items-center gap-3'>
                <div className='w-14 h-14 rounded-2xl overflow-hidden'>
                    <img src={logo} alt="logo"/>
                </div>
                <span className='text-xl font-medium'>404 Not Found</span>
            </SidebarHeader>

            <SidebarContent>
                <NavMenu/>
                <NavGames/>
            </SidebarContent>

            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;