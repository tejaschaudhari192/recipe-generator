"use client"

import React, { useEffect, useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUserData } from "@/lib/api"
import { Bell, ChevronUp, CreditCard, Edit, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from "@/components/logo"

type Chat = {
    id: string
    title: string
}

export function AppSidebar() {
    const [data, setData] = useState<Chat[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { data: session, status } = useSession()


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
        if (session)
            fetchData()
    }, [session])

    if (!session) {
        return null
    }
    const userName = session.user.name;
    const userEmail = session.user.email;



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

            <SidebarFooter className="border-t border-border">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-muted">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/anime/shadcn.jpg" alt="@shadcn" />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-medium">{userName}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {userEmail}
                                    </span>
                                </div>
                            </div>
                            <ChevronUp
                                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        side="top"
                        align="end"
                        className="w-56 rounded-xl"
                    >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Upgrade to Pro
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
