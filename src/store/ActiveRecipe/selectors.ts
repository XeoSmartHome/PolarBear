import { RootState } from "store";

export const selectCurrentIngredient = (store: RootState) => store.activeRecipe.currentIngredient;
