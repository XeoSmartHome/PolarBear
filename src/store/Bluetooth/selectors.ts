import { RootState } from "store";

export const selectAllDevices = (state: RootState) => state.bluetooth.devices;
