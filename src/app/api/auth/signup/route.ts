import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body)

    const user = await prismaClient.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })

    console.log(user)

    return NextResponse.json({
        user
    })
}

export async function GET() {
    const result = await prismaClient.user.findMany();
    return NextResponse.json({
        users:result
    })
}