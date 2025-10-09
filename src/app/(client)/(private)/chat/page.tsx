'use client';

import { useEffect, useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';

import RecipeCard from '@/components/recipe-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { getRecipes, getTopIngredients } from '@/lib/api'; // ✅ Import the new API

import type { Recipe } from '@/types';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

  const [topIngredients, setTopIngredients] = useState<string[]>([]);
  const [topUserIngredients, setTopUserIngredients] = useState<string[]>([]);

  useEffect(() => {
    const loadTopIngredients = async () => {
      const { topIngredients, topUserIngredients } = await getTopIngredients();
      setTopIngredients(topIngredients);
      setTopUserIngredients(topUserIngredients);
    };

    loadTopIngredients();
  }, []);

  async function setIngredients() {
    setLoading(true);
    const raw = inputRef.current?.value ?? '';
    const arrayItems = raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (arrayItems.length > 0) {
      try {
        const data = await getRecipes(arrayItems);
        setRecipes(data ?? []);
      } catch {
        toast.error('Failed to fetch recipes');
      }
    } else {
      setRecipes([]);
    }
    setLoading(false);
  }

  function handleIngredientClick(ingredient: string) {
    const currentValue = inputRef.current?.value ?? '';
    const currentList = currentValue
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    // Avoid adding duplicate ingredients
    if (!currentList.includes(ingredient)) {
      currentList.push(ingredient);
      inputRef.current!.value = currentList.join(', ');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted font-sans">
      <header className="p-5 flex justify-end items-center">
        {status === 'unauthenticated' && (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto p-6 flex flex-col items-center">
        {/* 👇 Top Ingredients Section */}
        {!loading && recipes.length == 0 && (
          <div className="w-full max-w-2xl mb-6">
            {topIngredients.length > 0 && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-indigo-600 text-base">
                    Global Top Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {topIngredients.map((ingredient, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="px-2 py-1 border rounded bg-white shadow-sm hover:bg-indigo-100 transition"
                        onClick={() => handleIngredientClick(ingredient)}
                      >
                        {ingredient}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {topUserIngredients.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-emerald-600 text-base">
                    Your Top Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {topUserIngredients.map((ingredient, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="px-2 py-1 border rounded bg-white shadow-sm hover:bg-emerald-100 transition"
                        onClick={() => handleIngredientClick(ingredient)}
                      >
                        {ingredient}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Loading or no recipes state */}
        {loading && (
          <div className="flex flex-col items-center space-y-3 text-gray-700">
            <img id="food" src="/anime/food.gif" alt="loading food" />
            <p className="text-xl font-semibold">
              Cooking up some tasty recipes...
            </p>
          </div>
        )}

        {!loading && recipes.length !== 0 && (
          <div className="space-y-6 w-full">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      {/* Footer Input */}
      <footer className="sticky bottom-5 bg-background border rounded-xl p-4 max-w-4xl w-full mx-auto flex gap-4 items-center shadow-md">
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
