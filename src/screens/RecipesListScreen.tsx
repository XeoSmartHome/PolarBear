import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Ingredient, Recipe } from "types";
import RecipeListItem from "components/Recipe/RecipeListItem";
import { useScreenHeader } from "navigation/hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationParams } from "navigation/types";
import RecipesListHeader from "components/Recipe/RecipesListHeader";
import { useSelector } from "react-redux";
import { selectRecipes } from "store/Recipes/selectors";
// import Fuse from "fuse.js";
// const fuseList = new Fuse(recipes, {keys: ["name"]});
// const filteredRecipes = useMemo(() =>
//         searchValue ? fuseList.search(searchValue).map(item => item.item) : recipes
//     , [searchValue]);


const RecipesListScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RouteNavigationParams>>();
    const recipes = useSelector(selectRecipes);
    // const [searchValue, setSearchValue] = useState("");
    // const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useScreenHeader({
        headerTitle: "Recipes",
    }, []);

    // const renderHeader = useCallback(() => {
    //     return (
    //         <RecipesListHeader onChangeSearchValue={setSearchValue} ingredients={ingredients} />
    //     );
    // }, [ingredients]);
    // const addIngredient = useCallback((newIngredient: Ingredient) => {
    //     setIngredients((oldIngredients) => {
    //         const index = oldIngredients.findIndex((i) => i.id === newIngredient.id);
    //         if (index !== -1) {
    //             oldIngredients.splice(index, 1);
    //             return [...oldIngredients];
    //         }
    //         return [...oldIngredients, newIngredient];
    //     });
    // }, []);

    const renderRecipe = useCallback(({ item }: ListRenderItemInfo<Recipe>) => {
        return (
            <RecipeListItem recipe={item} navigation={navigation} />
        );
    }, [navigation]);

    // const filteredRecipes = useMemo(() => {
    //     return recipes.filter(
    //         (recipe) => ingredients.every(
    //             (requiredIngredient) => recipe.ingredients.find(
    //                 (ingredient) => ingredient.id === requiredIngredient.id,
    //             ),
    //         ),
    //     );
    // }, [recipes, ingredients]);

    return (
        <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(recipe: Recipe) => recipe.id}
            contentContainerStyle={styles.contentContainer}
            // ListHeaderComponent={renderHeader}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    }
});

export default RecipesListScreen;
