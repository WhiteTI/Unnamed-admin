import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ChevronRight, LogOut, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAuth} from "@/components/auth/auth.tsx";

const NavUser = () => {
    const {user, logout} = useAuth();

    if (!user) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <AvatarImage src={user.image}/>
                                <AvatarFallback className='rounded-lg'>W</AvatarFallback>
                            </Avatar>
                            <span className='truncate font-semibold'>
                                {user.username ? user.username : user.login}
                            </span>
                            <ChevronRight className='ml-auto size-4'/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side='right' className='rounded-lg min-w-40' align='end'>
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild className='cursor-pointer'>
                            <SidebarMenuButton>
                                <User/>
                                <span>Profile</span>
                            </SidebarMenuButton>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild className='cursor-pointer'>
                            <SidebarMenuButton onClick={logout}>
                                <LogOut/>
                                <span>Log out</span>
                            </SidebarMenuButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default NavUser;