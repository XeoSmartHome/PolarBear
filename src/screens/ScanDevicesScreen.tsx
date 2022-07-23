import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { bluetoothSelectors } from "../store/slices/bluethooth";
import { Device } from "react-native-ble-plx";
import PBText from "../components/PBText";
import BluetoothManager from "../bluetooth/BluetoothManager";


const DeviceRow = ({ item: device }: ListRenderItemInfo<Device>) => {
    const onPress = useCallback(() => {
        console.log("connecting ...")
        BluetoothManager.connectToDevice(device.id);
    }, [device]);

    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <PBText style={styles.deviceName}>
                {device.name}
            </PBText>
            <PBText style={styles.deviceMac}>
                {device.id}
            </PBText>
        </TouchableOpacity>
    );
};

const ScanDevicesScreen = () => {
    const devices = useSelector(bluetoothSelectors.allDevices);
    console.log("a", devices.length);

    return (
        <FlatList
            data={devices}
            renderItem={(props: ListRenderItemInfo<Device>) => <DeviceRow {...props} />}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View
                style={{ borderBottomWidth: 2, borderBottomColor: "black", flex: 1 }} />}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: "5%",
    },
    row: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },
    deviceName: {
        fontSize: 16,
    },
    deviceMac: {
        marginTop: 6,
        color: "gray",
    },
});

export default ScanDevicesScreen;
