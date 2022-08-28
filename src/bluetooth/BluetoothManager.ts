import { BleError, BleManager, Device } from "react-native-ble-plx";
import { MDevice, setDevicesAction } from "store/Bluetooth/slice";
import { store } from "store";
import { Recipe } from "types";
import { Buffer } from "buffer";
import { setCurrentIngredient, startRecipeAction } from "store/ActiveRecipe/slice";

const SERVICE_UUID = "7c7aad84-e96b-46ca-b349-38f59ca42939";
const CURRENT_MASS_CHARACTERISTIC_UUID = "c41c7ff7-29a8-4d75-967d-d06159093fa1";
const CURRENT_INGREDIENT_CHARACTERISTIC_UUID = "8751470e-3db3-42b9-8d57-3276a0305138";
const RECIPE_CHARACTERISTIC_UUID = "acd319d5-965a-4af8-b559-cfb26c2b5435";

let bleManager: BleManager;
const devices: Device[] = [];
let onScanResult: (devices: MDevice[]) => void;
let device: Device | null = null;


const onDeviceFound = (error: BleError | null, device: Device | null) => {
    if (device && !devices.map(({ id }) => id).includes(device.id)) {
        devices.push(device);
        store.dispatch(setDevicesAction(devices.map((device) => ({ id: device.id, name: device.name }))));
        onScanResult && onScanResult(devices.map(({ id, name }) => ({ id, name })));
    }
};

const start = () => {
    console.log("scanning started");
    bleManager = new BleManager();
    bleManager.startDeviceScan([SERVICE_UUID], null, onDeviceFound);
};

const connectToDevice = (deviceId: string) => {
    //bleManager?.stopDeviceScan();
    bleManager?.connectToDevice(deviceId).then((d: Device) => {
        console.log("connected to", d.name);
        device = d;
    });
};

const stop = () => {
    bleManager?.destroy();
};

const setOnScanResult = (callback: (devices: MDevice[]) => void) => {
    onScanResult = callback;
};

const startRecipe = (recipe: Recipe) => {
    store.dispatch(startRecipeAction(recipe));
    device?.discoverAllServicesAndCharacteristics().then(() => {
        const message = Buffer.from(JSON.stringify({ ingredients: recipe.ingredients })).toString("base64");
        device?.writeCharacteristicWithResponseForService(SERVICE_UUID, RECIPE_CHARACTERISTIC_UUID, message)
            .then(() => {
                console.log("message send");
            })
            .catch((error) => {
                console.warn(JSON.stringify(error));
            });
        device?.monitorCharacteristicForService(SERVICE_UUID, CURRENT_INGREDIENT_CHARACTERISTIC_UUID, (error, characteristic) => {
            if(error) {
                console.log(error);
                return;
            }
            const ingredientId = new Buffer(characteristic?.value || "", "base64").toString();
            console.log("currentIngredientId", ingredientId);
            store.dispatch(setCurrentIngredient(ingredientId));
        });
    });
};

const BluetoothManager = {
    start,
    stop,
    connectToDevice,
    setOnScanResult,
    startRecipe,
};

export default BluetoothManager;
