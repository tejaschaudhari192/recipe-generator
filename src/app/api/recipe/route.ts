import { configurations } from "@/lib/configuration";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import type { Recipes } from "@/types";
import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2"
import { Prisma } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const ai = new GoogleGenAI({
    apiKey: configurations.google_api_key
});


interface RecipeRequestBody {
    ingredients: string[];
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    try {
        const body: RecipeRequestBody = await req.json();
        const ingredients = body.ingredients;
        const query = `Here are the ingredients I have: ${ingredients}. Please generate possible recipes only in JSON format, including the recipe name, ingredients, and instructions. Example format: [{ "title": "Recipe Name", "ingredients": [...], "instructions": [...] }]`;
        const response = await ai.models.generateContent({
            model: configurations.ai_model!,
            contents: query
        });

        let text = response.text ?? "";

        // Remove common markdown code fences if present
        if (text.startsWith("```json")) {
            text = text.replace(/^```json/, "").replace(/```$/, "").trim();
        } else if (text.startsWith("```")) {
            text = text.replace(/^```/, "").replace(/```$/, "").trim();
        }

        // Attempt parse
        let recipes: Recipes = [];
        try {
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed)) {
                recipes = parsed;
            } else {
                // if model returned an object, wrap it
                recipes = [parsed] as Recipes;
            }
        } catch (err) {
            // If parsing fails, return empty array with 502
            console.log(err)
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 502 });
        }

        if (session) {
            await prismaClient.chat.create({
                data: {
                    title: ingredients.join('+'),
                    ingredients,
                    recipes: recipes as unknown as Prisma.InputJsonValue[],  // cast here
                    user: { connect: { id: session.user.id } }
                }
            })
        }

        return NextResponse.json(recipes);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}