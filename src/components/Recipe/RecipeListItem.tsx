import React, { useCallback } from "react";
import { Card, Text } from "react-native-paper";
import { Recipe } from "types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SCREENS } from "navigation/SCREENS";
import { RouteNavigationParams } from "navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

interface RecipeListItemProps {
    recipe: Recipe;
    navigation: StackNavigationProp<RouteNavigationParams>;
}

const RecipeListItem = ({ recipe, navigation }: RecipeListItemProps) => {

    const goToRecipeDetails = useCallback(() => {
        navigation.navigate(SCREENS.RECIPE_DETAILS, { recipe });
    }, []);

    return (
        <TouchableOpacity style={styles.touchableOpacity} onPress={goToRecipeDetails}>
            <Card>
                <Card.Title title={recipe.name} />
                <Card.Content>
                    <Text>
                        {recipe.ingredients.toString()}
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export default RecipeListItem;
