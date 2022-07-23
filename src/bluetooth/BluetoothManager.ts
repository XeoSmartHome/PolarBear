import { BleError, BleManager, Device } from "react-native-ble-plx";
import { MDevice } from "../store/slices/bluethooth";

const SERVICE_UUID = "7c7aad84-e96b-46ca-b349-38f59ca42939";
const CURRENT_MASS_CHARACTERISTIC_UUID = "c41c7ff7-29a8-4d75-967d-d06159093fa1";
const CURRENT_INGREDIENT_CHARACTERISTIC_UUID = "8751470e-3db3-42b9-8d57-3276a0305138";
const RECIPE_CHARACTERISTIC_UUID = "acd319d5-965a-4af8-b559-cfb26c2b5435";

let bleManager: BleManager;
const devices: Device[] = [];
let onScanResult: (devices: MDevice[]) => void;


const onDeviceFound = (error: BleError | null, device: Device | null) => {
    if (device && !devices.map(({ id }) => id).includes(device.id)) {
        devices.push(device);
        onScanResult && onScanResult(devices.map(({id, name}) => ({id, name})));
    }
};

const start = () => {
    bleManager = new BleManager();
    bleManager.startDeviceScan([SERVICE_UUID], null, onDeviceFound);
};

const connectToDevice = (deviceId: string) => {
    //bleManager?.stopDeviceScan();
    bleManager?.connectToDevice(deviceId).then((device: Device) => {console.log("connected to", device.name)});
};

const stop = () => {
    bleManager?.destroy();
};

const setOnScanResult = (callback: (devices: MDevice[]) => void) => {
    onScanResult = callback;
};

const BluetoothManager = {
    start,
    stop,
    connectToDevice,
    setOnScanResult,
};

export default BluetoothManager;
