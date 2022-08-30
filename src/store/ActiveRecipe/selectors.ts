import { RootState } from "store";

export const selectCurrentIngredient = (store: RootState) => store.activeRecipe.currentIngredient;

export const selectCurrentMass = (store: RootState) => store.activeRecipe.mass;
