import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useScreenHeader } from 'navigation/hooks';
import { AnimatedFAB, FAB } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import { useSelector } from 'react-redux';
import { selectCustomRecipes } from 'store/CustomRecipes/selectors';

type CustomRecipesScreenProps = {
};

const CustomRecipesScreen = ({}: CustomRecipesScreenProps) => {
    useScreenHeader({
        title: 'My recipes',
    });

    const navigation = useNavigation<NavigationProp<RouteNavigationParams, SCREENS.CUSTOM_RECIPES_ROOT>>();
    const customRecipes = useSelector(selectCustomRecipes);

    const renderItem = useCallback(({item: recipe}: ListRenderItemInfo<typeof customRecipes[0]>) => {
        return <Text>{recipe.name}</Text>;
    }, []);

    const goToRecipeEditor = useCallback(() => {
        navigation.navigate(SCREENS.RECIPE_EDITOR, {scope: "new"})
    }, [navigation]);

    return (
        <View style={styles.root}>
            <FlatList data={customRecipes} renderItem={renderItem} />
            <FAB
                icon={'plus'}
                onPress={goToRecipeEditor}
                visible={true}
                style={styles.fab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 32,
    }
});

export default CustomRecipesScreen;
