import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient, MeasuredIngredient, Recipe } from "types";

enum RecipeStatus {
    NONE,
    STARTED,
    DONE
}

type ActiveRecipeState = {
    id: string;
    name: string;
    ingredients: MeasuredIngredient[];
    currentIngredient?: Ingredient;
    status: RecipeStatus;
    mass: number
}

const initialState: ActiveRecipeState = {
    id: "",
    name: "",
    ingredients: [],
    status: RecipeStatus.NONE,
    mass: 0.01,
};

const activeRecipeSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        startRecipeAction: (state, action: PayloadAction<Recipe>) => {
            const { ingredients, name, id } = action.payload;
            state.ingredients = ingredients;
            state.name = name;
            state.id = id;
            state.status = RecipeStatus.STARTED;
        },
        setCurrentIngredient: (state, action: PayloadAction<Ingredient["id"]>) => {
            state.currentIngredient = state.ingredients.find((ingredient) => ingredient.id === action.payload);
        },
        setCurrentMassAction: (state, action: PayloadAction<number>) => {
            state.mass = action.payload
        }
    },
});

export const activeRecipeReducer = activeRecipeSlice.reducer;
export const {setCurrentIngredient, startRecipeAction, setCurrentMassAction} = activeRecipeSlice.actions;
