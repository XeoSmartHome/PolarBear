import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Device } from "react-native-ble-plx";

interface Props {
    devices: Device[];
}

const BluetoothDevicesList = ({ devices }: Props) => {

    const renderItem = useCallback(({ item: device }: { item: Device }) => {
        return (
            <View style={styles.device}>
                <Text>
                    {device.name}
                </Text>
                <Text>
                    {device.id}
                </Text>
                <Text>
                    {device.rssi}
                </Text>
            </View>
        );
    }, []);

    const sortedDevices = useMemo(
        () => {
            return devices.sort(({ rssi: rssi1 }, { rssi: rssi2 }) => (rssi1 || 0) < (rssi2 || 0) ? 1 : -1);
        }, [devices]);

    return (
        <FlatList
            data={sortedDevices}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: "5%",
    },
    device: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
});

export default BluetoothDevicesList;
