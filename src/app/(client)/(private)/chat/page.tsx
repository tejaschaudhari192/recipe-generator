'use client';

import RecipeCard from '@/components/recipe-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecipes } from '@/lib/api';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import type { Recipe } from '@/types';
import { signIn, useSession } from 'next-auth/react';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { status } = useSession();

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

  return (
    <div className="flex flex-col min-h-screen bg-muted font-sans">
      <header className="p-5 flex justify-end items-center">
        {status === 'unauthenticated' && (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-6 flex flex-col justify-center items-center">
        {loading && (
          <div className="flex flex-col items-center space-y-3 text-gray-700">
            <img id="food" src="/anime/food.gif" alt="description" />
            <p className="text-xl font-semibold">
              Cooking up some tasty recipes...
            </p>
          </div>
        )}
        {!loading && recipes.length === 0 ? (
          <Card className="text-center w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-indigo-500">No Recipes Yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enter ingredients below and find your next favorite recipe!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 w-full">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      {/* Footer (Input + Button) */}
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
