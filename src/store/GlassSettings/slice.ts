import { createSlice } from '@reduxjs/toolkit';

interface GlassSettingsState {
    color: string;
    opacity: number;
    borderColor: string;
}

const initialState: GlassSettingsState = {
    color: "red",
    opacity: 0.2,
    borderColor: "white"
};

const glassSettingsSlice = createSlice({
    name: 'glassSettings',
    initialState,
    reducers: {},
});

export const glassSettingsReducer = glassSettingsSlice.reducer;
