import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "react-native-ble-plx";

export interface MDevice {
    id: string,
    name: string | null
}

interface BluetoothState {
    status: State;
    devices: MDevice[];
}

export const bluetoothSlice = createSlice({
    name: "bluetooth",
    initialState: {
        status: State.Unknown,
        devices: [],
    },
    reducers: {
        setStatus: (state: BluetoothState, action: PayloadAction<State>) => {
            state.status = action.payload;
        },
        setDevices: (state: BluetoothState, action: PayloadAction<MDevice[]>) => {
            state.devices = action.payload;
        },
    },
});

export const bluetoothReducer = bluetoothSlice.reducer;
