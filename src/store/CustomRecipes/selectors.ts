import { RootState } from 'store';

export const selectCustomRecipes = (store: RootState) =>
    store.customRecipes.recipes;

export const selectCustomRecipeById =
    (recipeId?: string) => (store: RootState) =>
        store.customRecipes.recipes.find(recipe => recipe.id === recipeId);
