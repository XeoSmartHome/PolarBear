import React, { useCallback, useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SCREENS } from 'navigation/SCREENS';
import GlassScreen from 'screens/GlassScreen';
import DevicesListScreen from 'screens/DevicesListScreen';
import RecipesListScreen from 'screens/RecipesListScreen';
import SettingsScreen from 'store/Settings/SettingsScreen';
import CustomRecipesScreen from 'screens/CustomRecipesScreen';

const BottomTabsNavigator = () => {
    const [routes] = useState([
        {
            key: SCREENS.CUSTOM_RECIPES_ROOT,
            title: 'Favorites',
            focusedIcon: 'star',
            unfocusedIcon: 'star-outline',
        },
        {
            key: SCREENS.RECIPES_LIST_ROOT,
            title: 'Recipes',
            focusedIcon: 'book-open-outline',
        },
        { key: SCREENS.GLASS, title: 'Glass', focusedIcon: 'glass-cocktail' },
        { key: SCREENS.DEVICES, title: 'Devices', focusedIcon: 'scale' },
        {
            key: SCREENS.SETTINGS_ROOT,
            title: 'Settings',
            focusedIcon: 'cog',
            unfocusedIcon: 'cog-outline',
        },
    ]);

    const [index, setIndex] = useState(0);

    const renderScene = BottomNavigation.SceneMap({
        [SCREENS.GLASS]: GlassScreen,
        [SCREENS.RECIPES_LIST_ROOT]: RecipesListScreen,
        [SCREENS.CUSTOM_RECIPES_ROOT]: CustomRecipesScreen,
        [SCREENS.DEVICES]: DevicesListScreen,
        [SCREENS.SETTINGS_ROOT]: SettingsScreen,
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
