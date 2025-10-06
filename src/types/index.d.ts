export type Ingredients = string[]

export interface Recipe {
	 title: string;
	 ingredients: Ingredients;
	 instructions: string[];
	 tags?: string[];
}

export type Recipes = Recipe[]