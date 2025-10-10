'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@ui/sidebar';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { NavMain } from './sidebar/nav-main';
import { TeamSwitcher } from './sidebar/team-switcher';
import { NavChats } from './sidebar/nav-chats';
import UserMenu from './sidebar/user-menu';

export function AppSidebar() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

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
        <NavChats />
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
