
import React from "react"
import ChatClient from "./chat-client"

interface PageProps {
  params: { chatId: string }
}

export default function ChatPage({ params }: PageProps) {
  return <ChatClient chatId={params.chatId} />
}
