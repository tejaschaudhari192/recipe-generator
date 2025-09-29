import { configurations } from "@/lib/configuration";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
const ai = new GoogleGenAI({
    apiKey: configurations.google_api_key
});


interface RecipeRequestBody {
    ingredients: string[];
}

export async function POST(req: NextRequest) {
    const body: RecipeRequestBody = await req.json();
    const ingredients = body.ingredients;
    const query = `Here are the ingredients I have: ${ingredients}. Please generate possible recipes only in JSON format, including the recipe name, ingredients, and instructions. Example format: [{ "title": "Recipe Name", "ingredients": [...], "instructions": [...] }]`;
    const response = await ai.models.generateContent({
        model: configurations.ai_model!,
        contents: query
    });
    let text = response.text!;

    // 2. Remove the markdown code block (```json ... ```)
    if (text.startsWith("```json")) {
        text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (text.startsWith("```")) {
        text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }

    // 3. Parse the cleaned JSON string
    const recipes = JSON.parse(text);
    return NextResponse.json(recipes);
}