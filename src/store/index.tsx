import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { bluetoothReducer } from "./Bluetooth/slice";
import { recipesReducer } from "store/Recipes/slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { activeRecipeReducer } from "store/ActiveRecipe/slice";
import { glassSettingsReducer } from 'store/GlassSettings/slice';
import { bottomTabNavigatorReducer } from 'store/BottomTabNavigator/slice';
import { customRecipesReducer } from 'store/CustomRecipes/slice';
import { persistReducer, PersistConfig, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customRecipesPersistorConfig = {
    key: "customRecipes",
    storage: AsyncStorage,
}

export const store = configureStore({
    reducer: {
        bluetooth: bluetoothReducer,
        recipe: recipesReducer,
        activeRecipe: activeRecipeReducer,
        glassSettings: glassSettingsReducer,
        bottomTabNavigator: bottomTabNavigatorReducer,
        customRecipes: persistReducer(customRecipesPersistorConfig, customRecipesReducer),
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
