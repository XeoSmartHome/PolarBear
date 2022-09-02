import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "navigation/SCREENS";
import DevicesListScreen from "screens/DevicesListScreen";
import MakeCocktailScreen from "screens/MakeCocktailScreen";
import RecipesListScreen from "screens/RecipesListScreen";
import RecipeDetailsScreen from "screens/RecipeDetailsScreen";
import IngredientDetailsScreen from "screens/IngredientDetailsScreen";
import HomeScreen from "screens/HomeScreen";
import GlassCustomizationScreen from 'screens/GlassCustomizationScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.HOME}>
            <Stack.Screen name={SCREENS.HOME} component={HomeScreen}/>
            <Stack.Screen name={SCREENS.RECIPES_LIST} component={RecipesListScreen} />
            <Stack.Screen name={SCREENS.RECIPE_DETAILS} component={RecipeDetailsScreen} />
            <Stack.Screen name={SCREENS.SCAN_DEVICES} component={DevicesListScreen} />
            <Stack.Screen name={SCREENS.MAKE_COCKTAIL} component={MakeCocktailScreen} />
            <Stack.Screen name={SCREENS.INGREDIENT_DETAILS} component={IngredientDetailsScreen} />
            <Stack.Screen name={SCREENS.CUSTOMIZE_GLASS} component={GlassCustomizationScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
