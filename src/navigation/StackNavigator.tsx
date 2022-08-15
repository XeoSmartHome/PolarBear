import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "navigation/SCREENS";
import ScanDevicesScreen from "screens/ScanDevicesScreen";
import MakeCocktailScreen from "screens/MakeCocktailScreen";
import RecipesListScreen from "screens/RecipesListScreen";
import RecipeDetailsScreen from "screens/RecipeDetailsScreen";


const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREENS.RECIPES_LIST} component={RecipesListScreen} />
            <Stack.Screen name={SCREENS.RECIPE_DETAILS} component={RecipeDetailsScreen} />
            <Stack.Screen name={SCREENS.SCAN_DEVICES} component={ScanDevicesScreen} />
            <Stack.Screen name={SCREENS.MAKE_COCKTAIL} component={MakeCocktailScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
