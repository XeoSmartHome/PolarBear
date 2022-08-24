import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { bluetoothReducer } from "./Bluetooth/slice";
import { recipesReducer } from "store/Recipes/slice";

export const store = configureStore({
    reducer: {
        bluetooth: bluetoothReducer,
        recipe: recipesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
