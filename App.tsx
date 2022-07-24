import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, LogBox, PermissionsAndroid, Text, View } from "react-native";
import { BleError, BleManager, Characteristic, Device, ScanCallbackType, Service } from "react-native-ble-plx";
import { Buffer } from "buffer";
import BluetoothDevicesList from "./src/components/BluetoothDevicesList";
import BluetoothManager from "./src/bluetooth/BluetoothManager";
import { StoreProvider } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import MakeCocktailScreen from "./src/screens/MakeCocktailScreen";

const SERVICE_UUID = "7c7aad84-e96b-46ca-b349-38f59ca42939";
const CURRENT_MASS_CHARACTERISTIC_UUID = "c41c7ff7-29a8-4d75-967d-d06159093fa1";
const CURRENT_INGREDIENT_CHARACTERISTIC_UUID = "8751470e-3db3-42b9-8d57-3276a0305138";
const RECIPE_CHARACTERISTIC_UUID = "acd319d5-965a-4af8-b559-cfb26c2b5435";

LogBox.ignoreLogs(["new NativeEventEmitter()"]);


const App1 = () => {
    // const bleManager = useRef(new BleManager());
    // const [devices, setDevices] = useState<Device[]>([]);
    //
    // const onCharacteristicValueRead = useCallback((error: BleError | null, characteristic: Characteristic | null) => {
    //     console.log(characteristic?.uuid, Buffer.from(characteristic?.value || "", "base64").toString());
    // }, []);
    //
    // const onCharacteristicsDiscovered = useCallback((characteristics: Characteristic[]) => {
    //     characteristics.forEach((characteristic) => {
    //         console.log("characteristic", characteristic.uuid);
    //         if (characteristic.uuid === CURRENT_MASS_CHARACTERISTIC_UUID || characteristic.uuid === CURRENT_INGREDIENT_CHARACTERISTIC_UUID) {
    //             characteristic.monitor(onCharacteristicValueRead);
    //         }
    //         if (characteristic.uuid === RECIPE_CHARACTERISTIC_UUID) {
    //             characteristic.writeWithResponse(Buffer.from(new Array(20).fill(1).join("aceasta este o reteta si ar multe ingrediente")).toString("base64")).then(console.log, console.warn);
    //         }
    //     });
    // }, []);
    //
    // const onServicesDiscovered = useCallback((services: Service[]) => {
    //     services.forEach((service) => {
    //         console.log("service", service.uuid);
    //         if (service.uuid === SERVICE_UUID) {
    //             service.characteristics().then(onCharacteristicsDiscovered);
    //         }
    //     });
    // }, []);
    //
    // const onDiscoveredAllServicesAndCharacteristics = useCallback((device: Device) => {
    //     device.services().then(onServicesDiscovered);
    // }, []);
    //
    // const onDeviceConnected = useCallback((device: Device) => {
    //     console.log("connected to", device.name);
    //     device.discoverAllServicesAndCharacteristics().then(onDiscoveredAllServicesAndCharacteristics);
    // }, []);
    //
    // const onScanResult = useCallback((error: BleError | null, scannedDevice: Device | null) => {
    //     if (scannedDevice !== null && !devices.map(({ id }) => id).includes(scannedDevice.id)) {
    //         console.log("true", scannedDevice.name);
    //         console.log(devices.length)
    //         setDevices((d) => [...d, scannedDevice]);
    //         //bleManager.current.devices([]).then(console.log)
    //     }
    //     // if (scannedDevice?.name?.includes("now")) {
    //     //     console.log("connecting to", scannedDevice?.name);
    //     //     bleManager.current.stopDeviceScan();
    //     //     scannedDevice?.connect().then(onDeviceConnected);
    //     // }
    // }, [devices]);
    //
    // const startScan = useCallback(() => {
    //     console.log("scan started");
    //     bleManager.current.startDeviceScan([SERVICE_UUID], { allowDuplicates: false }, onScanResult);
    // }, [onScanResult]);
    //
    // console.log(devices.length);
    //
    // useEffect(() => {
    //     bleManager.current.state().then((state) => {
    //         console.log(state);
    //         if (state === "PoweredOn") {
    //             startScan();
    //         }
    //     });
    //     return () => {
    //         try {
    //             bleManager.current.stopDeviceScan();
    //         } catch (e) {
    //
    //         }
    //     };
    // }, [startScan]);
    const onScanResult = useCallback((devices: Device[]) => {
        console.log("a", devices.length);
    }, []);

    const requestAppPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // Camera works good. But bluetooth is not working.
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log(PermissionsAndroid.RESULTS.GRANTED);
                console.log('You can use');
            } else {
                console.log('permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        console.log("asasdas")
        requestAppPermission();
        BluetoothManager.setOnScanResult(onScanResult);
        BluetoothManager.start();
        return BluetoothManager.stop;
    }, []);

    return (
        <View>
            <BluetoothDevicesList devices={[]} />
        </View>
    );
    // return (
    //     <MakeCocktailScreen/>
    // );
};

const App = () => {
    return (
        <StoreProvider>
            {/*<RootNavigator/>*/}
            <MakeCocktailScreen/>
        </StoreProvider>
    );
};

export default App;
