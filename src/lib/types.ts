export type Ingredients = string[]

export interface Recipe {
	 title: string
	 ingredients: string[]
	 instructions: string[]
	 tags?: string[]
}

export type Recipes = Recipe[]