import React from 'react';
import ChatClient from '@/_pages/chat';

interface PageProps {
  params: { chatId: string };
}

export default function ChatPage({ params }: PageProps) {
  return <ChatClient chatId={params.chatId} />;
}
