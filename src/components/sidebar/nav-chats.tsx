'use client';
import React, { useEffect, useState } from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@ui/sidebar';
import { Chat } from '@/types';
import { getUserData } from '@lib/api';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChatOptions } from '@components/chat-options';
import { Loader } from 'lucide-react';

export const NavChats = () => {
  const { data: session } = useSession();

  const [data, setData] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserData();
        setData(user.Chat);
      } catch (err) {
        console.error(err);
        setError('Failed to load chats.');
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchData();
  }, [session]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>My Chats</SidebarGroupLabel>
      <SidebarMenu>
        {loading && (
          <div className="flex justify-center items-center w-full h-16">
            <Loader className="animate-spin text-gray-500" />
          </div>
        )}

        {error && (
          <div className="p-2 text-sm text-red-500 text-center">{error}</div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="p-2 text-sm text-gray-400 text-center">
            No chats found.
          </div>
        )}

        {!loading &&
          !error &&
          data.length > 0 &&
          data.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton className="flex justify-between">
                <Link
                  href={`/chat/${chat.id}`}
                  className="cursor-pointer transition-all rounded-lg grow"
                >
                  {chat.title}
                </Link>
                <ChatOptions chat={chat} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
