import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismaClient from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json(
        { error: "Sign in first" },
        { status: 401 }
    );

    const user = await prismaClient.user.findUnique({
        where: {
            id: session.user.id
        },
        include:{
            Chat:true
        }
    })

    return NextResponse.json(user)
}