import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeasuredIngredient, Recipe } from "types";

enum RecipeStatus {
    NONE,
    STARTED,
    DONE
}

type ActiveRecipeState = {
    id: string;
    name: string;
    ingredients: MeasuredIngredient[];
    currentIngredient?: MeasuredIngredient;
    status: RecipeStatus;
}

const initialState: ActiveRecipeState = {
    id: "",
    name: "",
    ingredients: [],
    status: RecipeStatus.NONE,
};

const activeRecipeSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        startRecipe: (state, action: PayloadAction<Recipe>) => {
            const { ingredients, name, id } = action.payload;
            state.ingredients = ingredients;
            state.name = name;
            state.id = id;
            state.status = RecipeStatus.STARTED;
        },
    },
});

export const activeRecipeReducer = activeRecipeSlice.reducer;
