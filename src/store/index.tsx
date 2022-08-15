import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { bluetoothReducer } from "./Bluetooth/slice";

export const store = configureStore({
    reducer: {
        bluetooth: bluetoothReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
