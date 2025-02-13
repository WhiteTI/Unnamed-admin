import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from "@/components/ui/sidebar.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Link} from "@tanstack/react-router";
import genshinIcon from '@/assets/img/genshin.png'
import hsrIcon from '@/assets/img/hsr.png'
import zzzIcon from '@/assets/img/zzz.png'

const NavGames = () => {
    const games: {title: string, icon?: string, links?: {title: string, url: string}[]}[] = [
        {title: 'Genshin Impact', icon: genshinIcon, links: [{title: 'Персонажи', url: '#'}, {title: 'Оружие', url: '#'}, {title: 'Артефакты', url: '#'}]},
        {title: 'Honkai Star Rail', icon: hsrIcon, links: [{title: 'Персонажи', url: '#'}, {title: 'Конусы', url: '#'}, {title: 'Реликвии', url: '#'}]},
        {title: 'Zenless Zone Zero', icon: zzzIcon},
    ]

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Games
            </SidebarGroupLabel>

            <SidebarMenu>
                {games.map(game => (
                    <Collapsible
                        key={game.title}
                        asChild
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                    {game.icon && <img src={game.icon} alt="icon" className='w-6'/>}
                                    <span>{game.title}</span>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {game.links
                                        ? game.links?.map(link => (
                                            <SidebarMenuSubItem key={link.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link to={link.url}>
                                                        <span>{link.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )) : <SidebarMenuSubItem>
                                                <span>Возможно когда-нибудь</span>
                                            </SidebarMenuSubItem>
                                    }
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavGames;