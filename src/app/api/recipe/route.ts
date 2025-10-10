import { configurations } from '@lib/configuration';
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import type { Recipes } from '@/types';
import prismaClient from '@lib/prisma';
import { Prisma } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
const ai = new GoogleGenAI({
  apiKey: configurations.google_api_key,
});

interface RecipeRequestBody {
  ingredients: string[];
}

async function normalizeIngredientsWithAI(
  ingredients: string[]
): Promise<string[]> {
  const prompt = `You are a helpful assistant. Normalize this list of ingredients by grouping similar or misspelled terms together (e.g., "potatos", "potata" → "potato"). Return a JSON array of cleaned ingredients like: ["potato", "onion"]\n\n${JSON.stringify(ingredients)}`;

  try {
    const aiResponse = await ai.models.generateContent({
      model: configurations.ai_model!,
      contents: prompt,
    });

    let text = aiResponse.text ?? '';
    text = text
      .replace(/^```(json)?/, '')
      .replace(/```$/, '')
      .trim();

    const parsed = JSON.parse(text);
    return Array.isArray(parsed)
      ? parsed.map((i) => i.toLowerCase().trim())
      : ingredients;
  } catch (err) {
    console.error('AI normalization failed:', err);
    return ingredients.map((i) => i.toLowerCase().trim()); // fallback
  }
}

async function normalizeAndSaveIngredients(
  rawIngredients: string[],
  userId: number
) {
  const normalized = await normalizeIngredientsWithAI(rawIngredients);

  for (const ingredient of normalized) {
    try {
      await prismaClient.ingredient.upsert({
        where: { name_userId: { name: ingredient, userId } },
        update: { count: { increment: 1 } },
        create: { name: ingredient, count: 1, userId },
      });
    } catch (err) {
      console.error(`Ingredient save failed: ${ingredient}`, err);
    }
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const body: RecipeRequestBody = await req.json();
    const rawIngredients = body.ingredients;

    const query = `Here are the ingredients I have: ${rawIngredients}. Please generate possible recipes only in JSON format, including the recipe name, ingredients, and instructions. Format: [{ "title": "Recipe Name", "ingredients": [...], "instructions": [...] }]`;

    const response = await ai.models.generateContent({
      model: configurations.ai_model!,
      contents: query,
    });

    let text = response.text ?? '';
    text = text
      .replace(/^```(json)?/, '')
      .replace(/```$/, '')
      .trim();

    let recipes: Recipes = [];
    try {
      const parsed = JSON.parse(text);
      recipes = Array.isArray(parsed) ? parsed : [parsed];
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 502 }
      );
    }

    // Save chat with raw ingredients
    if (session) {
      await prismaClient.chat.create({
        data: {
          title: rawIngredients.join('+'),
          ingredients: rawIngredients,
          recipes: recipes as unknown as Prisma.InputJsonValue[],
          user: { connect: { id: session.user.id } },
        },
      });

      // Trigger background normalization + DB update
      setTimeout(() => {
        normalizeAndSaveIngredients(rawIngredients, session.user.id);
      }, 0);
    }

    return NextResponse.json(recipes);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
