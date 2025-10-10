'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@ui/sidebar';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider className="flex">
        <AppSidebar />
        <main className="grow">{children}</main>
      </SidebarProvider>
    </SessionProvider>
  );
}
