import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from 'navigation/SCREENS';
import SettingsScreen from 'store/Settings/SettingsScreen';

const Stack = createStackNavigator();

const SettingsNavigator = () => {

    return (
        <Stack.Navigator initialRouteName={SCREENS.SETTINGS}>
            <Stack.Screen
                name={SCREENS.SETTINGS}
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
};

export default SettingsNavigator;
