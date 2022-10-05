import { Recipe } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CustomRecipesState = {
    recipes: Recipe[];
    isLoading: boolean;
};

const initialState: CustomRecipesState = {
    recipes: [],
    isLoading: false,
};

const customRecipesSlice = createSlice({
    name: 'customRecipes',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.push(action.payload);
        },
        deleteRecipe: (state, action: PayloadAction<string>) => {
            state.recipes = state.recipes.filter(
                recipe => recipe.id !== action.payload,
            );
        },
        updateRecipe: (state, action: PayloadAction<Recipe>) => {
            state.recipes.map(recipe =>
                recipe.id === action.payload.id ? action.payload : recipe,
            );
        },
    },
});

export const customRecipesReducer = customRecipesSlice.reducer;
export const customRecipesActions = customRecipesSlice.actions;
