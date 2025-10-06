"use client"

import RecipeCard from "@/components/recipe-card"
import { getChatWithId } from "@/lib/api"
import { LoaderPinwheel } from "lucide-react"
import React, { useEffect, useState } from "react"

interface ChatClientProps {
  chatId: string
}

export default function ChatClient({ chatId }: ChatClientProps) {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getChatWithId(chatId)
        setRecipes(data.recipes || [])
      } catch (err) {
        console.error(err)
        setError("Failed to load recipes.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [chatId])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <main className="flex-grow max-w-4xl w-full mx-auto p-6 flex flex-col justify-center items-center">
        {loading ? (
          <div className="flex items-center justify-center text-gray-400">
            <LoaderPinwheel className="animate-spin w-6 h-6 mr-2" />
            Loading recipes...
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : recipes.length > 0 ? (
          <div className="space-y-6 w-full">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No recipes found.</div>
        )}
      </main>
    </div>
  )
}
