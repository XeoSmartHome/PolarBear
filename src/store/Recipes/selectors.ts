import { RootState } from "store";

export const selectRecipes = (state: RootState) => state.recipe.recipes;

export const selectRecipeById = (recipeId: string) => (state: RootState) => state.recipe.recipes.find((recipe) => recipe.id === recipeId);
