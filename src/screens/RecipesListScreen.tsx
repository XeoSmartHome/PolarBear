import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Recipe } from "types";
import RecipeListItem from "components/Recipe/RecipeListItem";
import { useScreenHeader } from "navigation/hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationParams } from "navigation/types";

const recipes: Recipe[] = new Array(10).fill(
    {
        name: "Green vodka",
        ingredients: [
            {
                name: "Green tea",
                quantity: 100,
            },
            {
                name: "Vodka",
                quantity: 50,
            },
        ],
    },
);

const RecipesListScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RouteNavigationParams>>();

    useScreenHeader({
        headerTitle: "Recipes",
    }, []);

    const renderRecipe = useCallback(({ item }: ListRenderItemInfo<Recipe>) => {
        return (
            <RecipeListItem recipe={item} navigation={navigation} />
        );
    }, [navigation]);

    return (
        <FlatList data={recipes} renderItem={renderRecipe} />
    );
};

const styles = StyleSheet.create({});

export default RecipesListScreen;
