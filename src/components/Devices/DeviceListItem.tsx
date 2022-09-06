import React, { useCallback } from 'react';
import { MDevice } from 'store/Bluetooth/slice';
import { List, Text } from 'react-native-paper';
import BluetoothManager from 'bluetooth/BluetoothManager';
import { StyleSheet } from 'react-native';

interface Props {
    device: MDevice;
    connected: boolean;
}

const DeviceListItem = ({ device, connected }: Props) => {
    const connectToDevice = useCallback(() => {
        BluetoothManager.connectToDevice(device.id);
    }, [device]);

    return (
        <List.Item
            title={device.name}
            titleNumberOfLines={1}
            description={device.id}
            descriptionNumberOfLines={1}
            onPress={connectToDevice}
            right={() =>
                connected && <Text style={styles.connected}>Connected</Text>
            }
        />
    );
};

const styles = StyleSheet.create({
    connected: {
        color: 'green',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: 6
    },
});

export default DeviceListItem;
