import { RootState } from "store";

export const selectAllDevices = (state: RootState) => state.bluetooth.devices;

export const selectIsConnected = (state: RootState) => state.bluetooth.isConnected;
