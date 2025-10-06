'use client';

import React, { useEffect, useState } from 'react';
import { getChatWithId } from '@/lib/api';
import { Recipe } from '@/types';
import RecipeCard from '@/components/recipe-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderPinwheel } from 'lucide-react';

interface ChatClientProps {
  chatId: string;
}

export default function ChatClient({ chatId }: ChatClientProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChatWithId(chatId);
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load recipes.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [chatId]);

  return (
    <div className="flex flex-col min-h-screen bg-muted font-sans">
      <main className="flex-grow max-w-4xl w-full mx-auto p-6 flex flex-col justify-center items-center">
        {loading ? (
          <div className="w-full space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="w-full">
                <CardHeader>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="w-full max-w-md text-center border-red-300 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-500">{error}</p>
            </CardContent>
          </Card>
        ) : recipes.length > 0 ? (
          <div className="space-y-6 w-full">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        ) : (
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>No Recipes Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                This chat doesn`&apos;`t contain any saved recipes.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
