import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CombinedDefaultTheme } from "theme/ThemeProvider";
import BottomTabsNavigator from 'navigation/BottomTabsNavigator';


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
            <BottomTabsNavigator/>
        </NavigationContainer>
    );
};

export default RootNavigator;
