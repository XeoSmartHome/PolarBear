export type Ingredient = {
    id: string;
    label: string;
    photo?: string;
};

export type MeasuredIngredient = Ingredient & {
    quantity: number;
};

export type Tag = {
    label: string;
    key: string;
};

export type Recipe = {
    name: string;
    description: string,
    ingredients: MeasuredIngredient[];
    tags: Tag[];
};
