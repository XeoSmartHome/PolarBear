import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "navigation/SCREENS";
import RecipeDetailsScreen from "screens/RecipeDetailsScreen";
import IngredientDetailsScreen from "screens/IngredientDetailsScreen";
import GlassCustomizationScreen from 'screens/GlassCustomizationScreen';
import BottomTabsNavigator from 'navigation/BottomTabsNavigator';
import RecipeEditorScreen from 'screens/RecipeEditorScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.HOME}>
            <Stack.Screen name={SCREENS.HOME} component={BottomTabsNavigator} options={{headerShown: false}}/>
            <Stack.Screen name={SCREENS.RECIPE_DETAILS} component={RecipeDetailsScreen} />
            <Stack.Screen name={SCREENS.INGREDIENT_DETAILS} component={IngredientDetailsScreen} />
            <Stack.Screen name={SCREENS.CUSTOMIZE_GLASS} component={GlassCustomizationScreen} />
            <Stack.Screen name={SCREENS.RECIPE_EDITOR} component={RecipeEditorScreen}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
