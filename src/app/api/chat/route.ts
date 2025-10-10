import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { chatId } = body;
  if (!chatId)
    return NextResponse.json({ error: 'ChatId Required' }, { status: 400 });

  const chat = await prismaClient.chat.findUnique({
    where: {
      id: chatId,
    },
  });

  if (!chat) {
    if (!chatId)
      return NextResponse.json({ error: 'Chat Not found' }, { status: 404 });
  }

  return NextResponse.json(chat);
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const chatId = url.searchParams.get('chatId');

  if (!chatId)
    return NextResponse.json({ error: 'ChatId Required' }, { status: 400 });

  const chat = await prismaClient.chat.delete({
    where: {
      id: chatId,
    },
  });

  if (!chat)
    return NextResponse.json({ error: 'Chat Not found' }, { status: 404 });

  return NextResponse.json(chat);
}
