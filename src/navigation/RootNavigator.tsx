import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BluetoothManager from "../bluetooth/BluetoothManager";
import { SCREENS } from "./SCREENS";
import ScanDevicesScreen from "../screens/ScanDevicesScreen";
import MakeCocktailScreen from "../screens/MakeCocktailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { bluetoothSlice } from "../store/slices/bluethooth";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        BluetoothManager.setOnScanResult((devices) => {
            console.log(devices);
            dispatch(bluetoothSlice.actions.setDevices(devices));
        })
        BluetoothManager.start();
        return BluetoothManager.stop;
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={SCREENS.SCAN_DEVICES} component={ScanDevicesScreen} />
                <Stack.Screen name={SCREENS.MAKE_COCKTAIL} component={MakeCocktailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
