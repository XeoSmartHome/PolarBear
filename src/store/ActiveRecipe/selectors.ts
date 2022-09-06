import { RootState, store } from 'store';

export const selectCurrentIngredient = (store: RootState) => store.activeRecipe.currentIngredient;

export const selectCurrentMass = (store: RootState) => store.activeRecipe.mass;

export const selectActiveRecipeIngredients = (store: RootState) => store.activeRecipe.ingredients;
