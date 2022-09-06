import React, { useCallback } from 'react';
import { Button, Text } from 'react-native-paper';
import { Linking, StyleSheet, View } from 'react-native';

interface Props {}

const BluetoothDisabled = ({}: Props) => {
    const openBluetoothSettings = useCallback(() => {
        Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS').then();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Bluetooth is disabled</Text>
            <Button
                style={styles.button}
                mode={'contained'}
                onPress={openBluetoothSettings}>
                Enable Bluetooth
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        fontSize: 16,
    },
    button: {
        marginTop: 20,
    },
});

export default BluetoothDisabled;
