import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Device } from "react-native-ble-plx";
import PBText from "../components/PBText";
import BluetoothManager from "../bluetooth/BluetoothManager";
import { selectAllDevices } from "store/Bluetooth/selectors";
import { useScreenHeader } from "navigation/hooks";
import { MDevice } from "store/Bluetooth/slice";
import { Divider, Text } from "react-native-paper";


const DeviceRow = ({ item: device }: ListRenderItemInfo<MDevice>) => {
    const onPress = useCallback(() => {
        console.log("connecting ...")
        BluetoothManager.connectToDevice(device.id);
    }, [device]);

    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Text style={styles.deviceName}>
                {device.name}
            </Text>
            <Text style={styles.deviceMac}>
                {device.id}
            </Text>
        </TouchableOpacity>
    );
};

const DevicesListScreen = () => {
    useScreenHeader({
        headerTitle: "Devices"
    })

    const devices = useSelector(selectAllDevices);

    return (
        <FlatList
            data={devices}
            renderItem={(props: ListRenderItemInfo<MDevice>) => <DeviceRow {...props} />}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={Divider}
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

export default DevicesListScreen;
