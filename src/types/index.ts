export type Ingredient = {
    name: string
    photo?: string
}

export type MeasuredIngredient = Ingredient & {
    quantity: number
}

export type Recipe = {
    name: string,
    ingredients: MeasuredIngredient[]
}
