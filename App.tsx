import React, { useEffect } from "react";
import { LogBox, PermissionsAndroid } from "react-native";
import BluetoothManager from "./src/bluetooth/BluetoothManager";
import RootNavigator from "./src/navigation/RootNavigator";
import { StoreProvider } from "store/StoreProvider";
import ThemeProvider from "theme/ThemeProvider";

// const SERVICE_UUID = "7c7aad84-e96b-46ca-b349-38f59ca42939";
// const CURRENT_MASS_CHARACTERISTIC_UUID = "c41c7ff7-29a8-4d75-967d-d06159093fa1";
// const CURRENT_INGREDIENT_CHARACTERISTIC_UUID = "8751470e-3db3-42b9-8d57-3276a0305138";
// const RECIPE_CHARACTERISTIC_UUID = "acd319d5-965a-4af8-b559-cfb26c2b5435";

LogBox.ignoreLogs(["new NativeEventEmitter()"]);


const App = () => {

    const requestAppPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // Camera works good. But bluetooth is not working.
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log(PermissionsAndroid.RESULTS.GRANTED);
                // console.log("You can use");
            } else {
                // console.log("permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        requestAppPermission();
        BluetoothManager.start();
        return BluetoothManager.stop;
    }, []);

    return (
        <StoreProvider>
            <ThemeProvider>
                <RootNavigator />
            </ThemeProvider>
        </StoreProvider>
    );
};

export default App;
