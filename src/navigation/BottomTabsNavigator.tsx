import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SCREENS } from 'navigation/SCREENS';
import GlassScreen from 'screens/GlassScreen';
import DevicesListScreen from 'screens/DevicesListScreen';
import RecipesNavigator from 'navigation/RecipesNavigator';

const WipRoute = () => <Text>WIP</Text>;

const BottomTabsNavigator = () => {
    const [index, setIndex] = useState(2);
    const [routes] = useState([
        {
            key: 'favorites',
            title: 'Favorites',
            focusedIcon: 'star',
            unfocusedIcon: 'star-outline',
        },
        {
            key: SCREENS.RECIPES_LIST,
            title: 'Recipes',
            focusedIcon: 'book-open-outline',
        },
        { key: SCREENS.GLASS, title: 'Glass', focusedIcon: 'glass-cocktail' },
        { key: SCREENS.DEVICES, title: 'Devices', focusedIcon: 'scale' },
        {
            key: 'settings',
            title: 'Settings',
            focusedIcon: 'cog',
            unfocusedIcon: 'cog-outline',
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        [SCREENS.GLASS]: GlassScreen,
        [SCREENS.RECIPES_LIST]: RecipesNavigator,
        favorites: WipRoute,
        [SCREENS.DEVICES]: DevicesListScreen,
        settings: WipRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            sceneAnimationType={'shifting'}
        />
    );
};

export default BottomTabsNavigator;
