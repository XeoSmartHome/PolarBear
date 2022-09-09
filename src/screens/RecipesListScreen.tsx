import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Recipe } from 'types';
import RecipeListItem from 'components/Recipe/RecipeListItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteNavigationParams } from 'navigation/types';
import { selectRecipes } from 'store/Recipes/selectors';
import { useAppSelector } from 'store';
import { useScreenHeader } from 'navigation/hooks';

const RecipesListScreen = () => {
    useScreenHeader(
        {
            headerTitle: 'Recipes',
        },
        [],
    );

    const navigation =
        useNavigation<StackNavigationProp<RouteNavigationParams>>();
    const recipes = useAppSelector(selectRecipes);

    const renderRecipe = useCallback(
        ({ item }: ListRenderItemInfo<Recipe>) => {
            return <RecipeListItem recipe={item} navigation={navigation} />;
        },
        [navigation],
    );

    return (
        <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(recipe: Recipe) => recipe.id}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    },
});

export default RecipesListScreen;
