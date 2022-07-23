import { configureStore } from "@reduxjs/toolkit";
import { bluetoothSlice } from "./slices/bluethooth";
import { Provider } from "react-redux";
import React, { ReactNode } from "react";

export const store = configureStore({
    reducer: {
        bluetooth: bluetoothSlice.reducer,
    },
});


interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) =>
    <Provider store={store} children={children} />;
