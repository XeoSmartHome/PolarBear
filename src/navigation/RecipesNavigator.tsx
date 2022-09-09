import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from 'navigation/SCREENS';
import RecipesListScreen from 'screens/RecipesListScreen';
import RecipeDetailsScreen from 'screens/RecipeDetailsScreen';

const Stack = createStackNavigator();

const RecipesNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS.RECIPES_LIST}>
            <Stack.Screen
                name={SCREENS.RECIPES_LIST}
                component={RecipesListScreen}
            />
            <Stack.Screen
                name={SCREENS.RECIPE_DETAILS}
                component={RecipeDetailsScreen}
            />
        </Stack.Navigator>
    );
};

export default RecipesNavigator;
