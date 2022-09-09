import React, { useCallback } from "react";
import { Card, Chip, Text } from "react-native-paper";
import { Ingredient, Recipe, Tag } from "types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SCREENS } from "navigation/SCREENS";
import { RouteNavigationParams } from "navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

interface RecipeListItemProps {
    recipe: Recipe;
    navigation: StackNavigationProp<RouteNavigationParams>;
    addIngredient?: (newIngredient: Ingredient) => void;
}

interface RecipeTagProps {
    ingredient: Ingredient;
    addIngredient?: (newIngredient: Ingredient) => void;
}

const RecipeIngredient = ({ ingredient, addIngredient }: RecipeTagProps) => {
    const onPress = useCallback(() => {
        addIngredient?.(ingredient);
    }, [addIngredient]);

    return (
        <Chip
            mode={"outlined"}
            onPress={onPress}
            style={styles.ingredient}
        >
            {ingredient.label}
        </Chip>
    );
};

const RecipeListItem = ({ recipe, navigation, addIngredient }: RecipeListItemProps) => {

    const goToRecipeDetails = useCallback(() => {
        navigation.navigate(SCREENS.RECIPE_DETAILS, { recipe });
    }, []);

    return (
        <TouchableOpacity style={styles.touchableOpacity} onPress={goToRecipeDetails}>
            <Card style={styles.card}>
                <Card.Title title={recipe.name} titleVariant={"titleLarge"} titleNumberOfLines={2} />
                <Card.Content>
                    <Text variant={"bodyMedium"} style={styles.description} numberOfLines={3}>
                        {recipe.description}
                    </Text>
                    <View style={styles.ingredients}>
                        {
                            recipe.ingredients.map((ingredient) => (
                                <RecipeIngredient key={ingredient.id} ingredient={ingredient} addIngredient={addIngredient} />
                            ))
                        }
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        marginVertical: 10
    },
    card: {
        borderRadius: 16,
        padding: 8,
    },
    description: {},
    ingredients: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
    },
    ingredient: {
        marginRight: 12,
        marginVertical: 4,
    },
});

export default RecipeListItem;
