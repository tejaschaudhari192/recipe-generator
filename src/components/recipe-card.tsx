import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Recipe } from "@/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const [showInstructions, setShowInstructions] = useState(true);

    return (
        <Card className="hover:shadow-lg transition-shadow border border-muted bg-white rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-primary mb-1">
                    {recipe.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                    {recipe.tags?.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                        🧂 Ingredients
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {recipe.ingredients?.map((ingredient: string, i: number) => (
                            <li key={i}>{ingredient}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <div
                        className="flex items-center justify-between cursor-pointer mb-2"
                        onClick={() => setShowInstructions(!showInstructions)}
                    >
                        <h3 className="text-lg font-semibold text-muted-foreground">
                            📋 Instructions
                        </h3>
                        {showInstructions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {showInstructions && recipe.instructions?.length > 0 && (
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                            {recipe.instructions.map((step: string, i: number) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                    )}
                </section>
            </CardContent>
        </Card>
    );
}
