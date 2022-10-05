import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CombinedDefaultTheme } from "theme/ThemeProvider";
import StackNavigator from 'navigation/StackNavigator';


const RootNavigator = () => {

    return (
        <NavigationContainer theme={CombinedDefaultTheme}>
            <StackNavigator/>
        </NavigationContainer>
    );
};

export default RootNavigator;
