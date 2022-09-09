import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { State } from 'react-native-ble-plx';
import { selectAllDevices, selectIsConnected } from 'store/Bluetooth/selectors';
import { MDevice } from 'store/Bluetooth/slice';
import { Divider } from 'react-native-paper';
import { useBluetoothState } from 'bluetooth/utils';
import BluetoothDisabled from 'components/Devices/BluetoothDisabled';
import DeviceListItem from 'components/Devices/DeviceListItem';
import { useAppSelector } from 'store';

const DevicesListScreen = () => {
    const devices = useSelector(selectAllDevices);
    const bluetoothState = useBluetoothState();

    const deviceConnected = useAppSelector(selectIsConnected);

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<MDevice>) => {
            return <DeviceListItem device={item} connected={deviceConnected} />;
        },
        [deviceConnected],
    );

    if (bluetoothState !== State.PoweredOn) {
        return <BluetoothDisabled />;
    }

    return (
        <FlatList
            data={devices}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={Divider}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {},
    row: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
});

export default DevicesListScreen;
