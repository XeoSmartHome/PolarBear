import React, { useCallback, useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SCREENS } from 'navigation/SCREENS';
import GlassScreen from 'screens/GlassScreen';
import DevicesListScreen from 'screens/DevicesListScreen';
import { useAppSelector } from 'store';
import { selectCurrentTabIndex } from 'store/BottomTabNavigator/selectors';
import { useDispatch } from 'react-redux';
import { jumpTo } from 'store/BottomTabNavigator/slice';
import RecipesListScreen from 'screens/RecipesListScreen';
import RecipeEditorScreen from 'screens/RecipeEditorScreen';
import SettingsScreen from 'store/Settings/SettingsScreen';


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

    const index = useAppSelector(selectCurrentTabIndex);
    const dispatch = useDispatch();

    const setIndex = useCallback((idx: number) => {
        dispatch(jumpTo(idx));
    }, []);

    const renderScene = BottomNavigation.SceneMap({
        [SCREENS.GLASS]: GlassScreen,
        [SCREENS.RECIPES_LIST_ROOT]: RecipesListScreen,
        [SCREENS.CUSTOM_RECIPES_ROOT]: RecipeEditorScreen,
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
