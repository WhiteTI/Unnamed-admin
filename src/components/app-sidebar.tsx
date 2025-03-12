import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import NavUser from "@/components/nav-user.tsx";
import NavGames from "@/components/nav-games.tsx";
import NavMenu from "@/components/nav-menu.tsx";

const AppSidebar = () => {

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                Logo + Название
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