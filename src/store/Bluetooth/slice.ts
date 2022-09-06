import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "react-native-ble-plx";

export interface MDevice {
    id: string,
    name: string | null,
}

interface BluetoothState {
    status: State;
    devices: MDevice[];
    isConnected: boolean
}

const initialState: BluetoothState = {
    status: State.Unknown,
    devices: [],
    isConnected: false,
}

export const bluetoothSlice = createSlice({
    name: "bluetooth",
    initialState,
    reducers: {
        setStatusAction: (state: BluetoothState, action: PayloadAction<State>) => {
            state.status = action.payload;
        },
        setDevicesAction: (state: BluetoothState, action: PayloadAction<MDevice[]>) => {
            state.devices = action.payload;
        },
        deviceConnectedAction: (state) => {
            state.isConnected = true;
        }
    },
});

export const bluetoothReducer = bluetoothSlice.reducer;
export const {setDevicesAction, setStatusAction, deviceConnectedAction} = bluetoothSlice.actions;
