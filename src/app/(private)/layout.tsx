'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider className="flex">
        <AppSidebar />
        <main className="grow">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
