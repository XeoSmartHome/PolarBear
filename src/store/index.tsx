import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { bluetoothReducer } from "./Bluetooth/slice";
import { recipesReducer } from "store/Recipes/slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { activeRecipeReducer } from "store/ActiveRecipe/slice";
import { glassSettingsReducer } from 'store/GlassSettings/slice';
import { bottomTabNavigatorReducer } from 'store/BottomTabNavigator/slice';
import { customRecipesReducer } from 'store/CustomRecipes/slice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

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
        // @ts-ignore
        customRecipes: persistReducer(customRecipesPersistorConfig, customRecipesReducer),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
