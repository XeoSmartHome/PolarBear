import { RootState } from 'store';

export const selectCustomRecipes = (store: RootState) => store.customRecipes.recipes;
