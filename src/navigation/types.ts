import { SCREENS } from "navigation/SCREENS";
import { MeasuredIngredient, Recipe } from "types";

export type RouteNavigationParams = {
    [SCREENS.RECIPES_LIST]: {},
    [SCREENS.RECIPE_DETAILS]: {
        recipe: Recipe
    },
    [SCREENS.INGREDIENT_DETAILS]: {
        ingredient: MeasuredIngredient
    }
};
