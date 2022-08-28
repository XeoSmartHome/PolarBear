import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { bluetoothReducer } from "./Bluetooth/slice";
import { recipesReducer } from "store/Recipes/slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { activeRecipeReducer } from "store/ActiveRecipe/slice";

export const store = configureStore({
    reducer: {
        bluetooth: bluetoothReducer,
        recipe: recipesReducer,
        activeRecipe: activeRecipeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
