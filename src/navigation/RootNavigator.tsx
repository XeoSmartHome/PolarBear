import React from "react";
import StackNavigator from "navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { CombinedDefaultTheme } from "theme/ThemeProvider";


const RootNavigator = () => {

    // useEffect(() => {
    //     BluetoothManager.setOnScanResult((devices) => {
    //         console.log(devices);
    //         dispatch(bluetoothSlice.actions.setDevices(devices));
    //     })
    //     BluetoothManager.start();
    //     return BluetoothManager.stop;
    // }, [dispatch]);

    return (
        <NavigationContainer theme={CombinedDefaultTheme}>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;
