import React, { useCallback, useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SCREENS } from 'navigation/SCREENS';
import GlassScreen from 'screens/GlassScreen';
import DevicesListScreen from 'screens/DevicesListScreen';
import RecipesNavigator from 'navigation/RecipesNavigator';
import { useAppSelector } from 'store';
import { selectCurrentTabIndex } from 'store/BottomTabNavigator/selectors';
import { useDispatch } from 'react-redux';
import { jumpTo } from 'store/BottomTabNavigator/slice';
import SettingsNavigator from 'navigation/SettingsNavigator';

const WipRoute = () => <Text>WIP</Text>;

const BottomTabsNavigator = () => {
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
            key: SCREENS.SETTINGS,
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
        [SCREENS.RECIPES_LIST]: RecipesNavigator,
        favorites: WipRoute,
        [SCREENS.DEVICES]: DevicesListScreen,
        [SCREENS.SETTINGS]: SettingsNavigator,
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
