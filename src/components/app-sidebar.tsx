'use client';

import React, { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getUserData } from '@/lib/api';
import { ChevronsUpDown, Edit, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavMain } from './sidebar/nav-main';
import { TeamSwitcher } from './sidebar/team-switcher';
import ThemeSwitch from './theme-switch';

type Chat = {
  id: string;
  title: string;
};

export function AppSidebar() {
  const [data, setData] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const isMobile = useIsMobile();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserData();
        setData(user.Chat);
        console.log(user.Chat);
      } catch (err) {
        console.error(err);
        setError('Failed to load chats.');
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchData();
  }, [session]);

  if (!session) {
    return null;
  }
  const userName = session.user.name;
  const userEmail = session.user.email;

  const navMain = [
    {
      title: 'New Chat',
      url: '/chat',
      icon: Edit,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>My Chats</SidebarGroupLabel>
          {loading && (
            <div className="p-2 text-sm text-gray-500">Loading chats...</div>
          )}

          {error && <div className="p-2 text-sm text-red-500">{error}</div>}

          {!loading && !error && data && data.length === 0 && (
            <div className="p-2 text-sm text-gray-400">No chats found.</div>
          )}

          {!loading &&
            !error &&
            data &&
            data.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton>
                  <Link
                    href={'/chat/' + chat.id}
                    className=" cursor-pointer transition-all rounded-lg"
                  >
                    {chat.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="anime/shadcn.jpg" alt={userName} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{userName}</span>
                    <span className="truncate text-xs">{userEmail}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/anime/shadcn.jpg" alt={userName} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{userName}</span>
                      <span className="truncate text-xs">{userEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Dark Mode
                  <ThemeSwitch type="switch" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
