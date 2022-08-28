import { SCREENS } from "navigation/SCREENS";
import { MeasuredIngredient, Recipe } from "types";

export type RouteNavigationParams = {
    [SCREENS.HOME]: undefined,
    [SCREENS.SCAN_DEVICES]: undefined,
    [SCREENS.RECIPES_LIST]: undefined,
    [SCREENS.RECIPE_DETAILS]: {
        recipe: Recipe
    },
    [SCREENS.INGREDIENT_DETAILS]: {
        ingredient: MeasuredIngredient
    }
};
