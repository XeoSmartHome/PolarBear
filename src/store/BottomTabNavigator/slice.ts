import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BottomTabNavigatorState = {
    index: number;
};

const initialState: BottomTabNavigatorState = {
    index: 2,
};

const bottomTabNavigatorSlice = createSlice({
    name: 'bottomTabNavigator',
    initialState,
    reducers: {
        jumpTo: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        },
    },
});

export const bottomTabNavigatorReducer = bottomTabNavigatorSlice.reducer;
export const {jumpTo} = bottomTabNavigatorSlice.actions;
