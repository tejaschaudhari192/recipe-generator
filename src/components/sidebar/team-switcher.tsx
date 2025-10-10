'use client';

import * as React from 'react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@ui/sidebar';
import Logo from '@/components/logo';
import IconHoverToggle from '../icon-toggle';

export function TeamSwitcher() {
  const { open } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <IconHoverToggle open={open} />

          <div className="grid flex-1 text-left text-sm leading-tight">
            <Logo className="text-2xl" />
          </div>
          <SidebarTrigger />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
