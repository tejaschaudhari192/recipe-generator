'use client';

import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRecipes, getServerStatus } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Recipe } from "@/lib/types";
import Image from "next/image";


export default function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  async function setIngredients() {
    setLoading(true);
    const raw = inputRef.current?.value ?? "";
    const arrayItems = raw.split(',').map(item => item.trim()).filter(Boolean);
    if (arrayItems.length > 0) {
      try {
        const data = await getRecipes(arrayItems);
        setRecipes(data ?? []);
      } catch {
        toast.error("Failed to fetch recipes");
      }
    } else {
      setRecipes([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    getServerStatus()
      .then((alive) => {
        if (alive) toast.success("Server Connected!", { position: 'top-right' })
        else toast.error("Server Not Reachable", { position: 'top-right' })
      })
      .catch(() => toast.error("Server Not Reachable", { position: 'top-right' }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <main className="flex-grow max-w-4xl w-full mx-auto p-6 flex flex-col justify-center items-center">
        {loading && (
          <div className="flex flex-col items-center space-y-3 text-gray-700">
            <Image id="food" src="/anime/food.gif" alt="description" />
            <p className="text-xl font-semibold">Cooking up some tasty recipes...</p>
          </div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="flex flex-col items-center space-y-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 1v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0H4" />
            </svg>
            <p className="text-lg font-medium">Enter ingredients above and find your next favorite recipe!</p>
          </div>
        )}

        {recipes.length > 0 && (
          <div className="space-y-6 w-full">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      <footer className="sticky bottom-5 bg-white border rounded-xl border-gray-300 p-4 max-w-4xl w-full mx-auto flex gap-4 items-center shadow-md">
        <Input
          placeholder="Enter ingredients (comma-separated)"
          ref={inputRef}
          className="flex-grow"
          disabled={loading}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') setIngredients();
          }}
        />
        <Button onClick={setIngredients} disabled={loading}>
          {loading ? 'Loading...' : 'Get Recipes'}
        </Button>
      </footer>
    </div>
  );
}
