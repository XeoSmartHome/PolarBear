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
}

interface RecipeTagProps {
    ingredient: Ingredient;
}

const randomPick = (arr: Ingredient[]) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, Math.floor(Math.random() * (arr.length - 2)) + 2);
}

const RecipeIngredient = ({ ingredient }: RecipeTagProps) => {
    const onPress = useCallback(() => {

    }, []);

    return (
        <Chip
            key={ingredient.id}
            mode={"outlined"}
            onPress={onPress}
            style={styles.ingredient}
        >
            {ingredient.label}
        </Chip>
    );
};

const RecipeListItem = ({ recipe, navigation }: RecipeListItemProps) => {

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
                            randomPick(recipe.ingredients).map((ingredient) => (
                                <RecipeIngredient ingredient={ingredient} />
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
        marginVertical: 10,
        marginHorizontal: 20,
    },
    card: {
        borderRadius: 20,
    },
    description: {
    },
    ingredients: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12
    },
    ingredient: {
        marginRight: 12,
        marginVertical: 4
    },
});

export default RecipeListItem;
