import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Fetch global top 10 ingredient names as string[]
    const topIngredients = await prisma.ingredient.findMany({
      orderBy: { count: 'desc' },
      take: 10,
      select: { name: true },
    });

    // Map to string array
    const topIngredientsNames = topIngredients.map((i) => i.name);

    let topUserIngredientsNames: string[] = [];

    if (session?.user?.id) {
      const topUserIngredients = await prisma.ingredient.findMany({
        where: { userId: session.user.id },
        orderBy: { count: 'desc' },
        take: 10,
        select: { name: true },
      });

      topUserIngredientsNames = topUserIngredients.map((i) => i.name);
    }

    return NextResponse.json({
      topIngredients: topIngredientsNames,
      topUserIngredients: topUserIngredientsNames,
    });
  } catch (error) {
    console.error('Failed to fetch ingredients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ingredients' },
      { status: 500 }
    );
  }
}
