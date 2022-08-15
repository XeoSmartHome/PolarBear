import { SCREENS } from "navigation/SCREENS";
import { Recipe } from "types";

export type RouteNavigationParams = {
    [SCREENS.RECIPES_LIST]: {},
    [SCREENS.RECIPE_DETAILS]: {
        recipe: Recipe
    }
};
