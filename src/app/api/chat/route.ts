import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismaClient from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { chatId } = body
    if (!chatId) return NextResponse.json(
        { error: "ChatId Required" },
        { status: 400 }
    );

    const chat = await prismaClient.chat.findUnique({
        where: {
            id: chatId
        }
    })

    if (!chat) {
        if (!chatId) return NextResponse.json(
            { error: "Chat Not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(chat)
}