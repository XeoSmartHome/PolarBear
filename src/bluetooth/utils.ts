import { useEffect, useState } from 'react';
import { BleManager, State } from 'react-native-ble-plx';

export const useBluetoothState = (): State => {
    const [bluetoothState, setBluetoothState] = useState<State>(State.Unknown);

    useEffect(() => {
        new BleManager().onStateChange(setBluetoothState, true);
    }, []);

    return bluetoothState;
};
