"use client"

import React, { useEffect, useState } from "react"
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
} from "@/components/ui/sidebar"
import Logo from "./logo"
import { getUserData } from "@/lib/api"
import { Edit } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

type Chat = {
    id: string
    title: string
}

export function AppSidebar() {
    const [data, setData] = useState<Chat[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { data: session } = useSession()


    useEffect(() => {
        async function fetchData() {
            try {
                const user = await getUserData()
                setData(user.Chat)
                console.log(user.Chat)
            } catch (err) {
                console.error(err)
                setError("Failed to load chats.")
            } finally {
                setLoading(false)
            }
        }
        if (session) {   
            fetchData()
        }
    }, [])

    if (!session) {
        return null
    }

    

    return (
        <Sidebar>
            <SidebarHeader>
                <Logo className="scale-[0.5]" />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Link href="/chat" className="flex items-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    <span>New Chat</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>My Chats</SidebarGroupLabel>
                    {loading && (
                        <div className="p-2 text-sm text-gray-500">Loading chats...</div>
                    )}

                    {error && (
                        <div className="p-2 text-sm text-red-500">{error}</div>
                    )}

                    {!loading && !error && data && data.length === 0 && (
                        <div className="p-2 text-sm text-gray-400">No chats found.</div>
                    )}

                    {!loading &&
                        !error &&
                            data &&
                        data.map((chat) => (
                            <Link href={'/chat/' + chat.id}
                                key={chat.id}
                                className="p-2 cursor-pointer hover:bg-gray-100 transition-all rounded-lg"
                            >
                                {chat.title}
                            </Link>
                        ))}
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="px-4 py-2 text-sm text-gray-500">{session?.user.email}</div>
            </SidebarFooter>
        </Sidebar>
    )
}
