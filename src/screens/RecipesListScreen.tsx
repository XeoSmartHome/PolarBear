import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Recipe } from "types";
import RecipeListItem from "components/Recipe/RecipeListItem";
import { useScreenHeader } from "navigation/hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationParams } from "navigation/types";
import RecipesListHeader from "components/Recipe/RecipesListHeader";
import Fuse from "fuse.js";

const recipes: Recipe[] = new Array(10).fill(
    {
        name: "Green vodka",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        ingredients: [
            {
                id: "1",
                label: "Apple juice",
                quantity: 100,
            },
            {
                id: "2",
                label: "Vodka",
                quantity: 50,
            },
            {
                id: "3",
                label: "Whiskey",
                quantity: 50,
            },
            {
                id: "4",
                label: "Orange juice",
                quantity: 50,
            },
            {
                id: "5",
                label: "Cranberry Cider",
                quantity: 50,
            },
        ],
    },
);

const fuseList = new Fuse(recipes, {keys: ["name"]});

const RecipesListScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RouteNavigationParams>>();
    const [searchValue, setSearchValue] = useState("");

    useScreenHeader({
        headerTitle: "Recipes",
    }, []);

    const filteredRecipes = useMemo(() =>
            searchValue ? fuseList.search(searchValue).map(item => item.item) : recipes
        , [searchValue]);

    const renderHeader = useCallback(() => {
        return (
            <RecipesListHeader onChangeSearchValue={setSearchValue} />
        );
    }, []);

    const renderRecipe = useCallback(({ item }: ListRenderItemInfo<Recipe>) => {
        return (
            <RecipeListItem recipe={item} navigation={navigation} />
        );
    }, [navigation]);

    console.log("rendering list")

    return (
        <FlatList data={filteredRecipes} renderItem={renderRecipe} ListHeaderComponent={renderHeader} />
    );
};

const styles = StyleSheet.create({});

export default RecipesListScreen;
