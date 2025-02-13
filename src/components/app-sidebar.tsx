import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader} from "@/components/ui/sidebar.tsx";
import NavUser from "@/components/nav-user.tsx";
import NavGames from "@/components/nav-games.tsx";

const AppSidebar = () => {

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                Logo + Название
            </SidebarHeader>

            <SidebarContent>
                <NavGames/>
            </SidebarContent>

            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;