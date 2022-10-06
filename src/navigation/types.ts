import { SCREENS } from 'navigation/SCREENS';
import { MeasuredIngredient, Recipe } from 'types';

export type RouteNavigationParams = {
    [SCREENS.HOME]: undefined;
    [SCREENS.DEVICES]: undefined;
    [SCREENS.RECIPES_LIST]: undefined;
    [SCREENS.RECIPE_DETAILS]: {
        recipe: Recipe;
    };
    [SCREENS.INGREDIENT_DETAILS]: {
        ingredient: MeasuredIngredient;
    };
    [SCREENS.CUSTOMIZE_GLASS]: undefined;
    [SCREENS.CUSTOM_RECIPES_ROOT]: undefined;
    [SCREENS.RECIPE_EDITOR]:
        | {
              scope: 'edit';
              recipe: Recipe;
          }
        | {
              scope: 'new';
          };
    [SCREENS.INGREDIENT_EDITOR]: {
        ingredient: MeasuredIngredient,
    }
    [SCREENS.RECIPE_IMPORTER]: undefined;
};
