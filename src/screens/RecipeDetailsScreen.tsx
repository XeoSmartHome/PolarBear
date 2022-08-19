import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RouteNavigationParams } from "navigation/types";
import { SCREENS } from "navigation/SCREENS";
import { Button, Divider, IconButton, List, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useScreenHeader } from "navigation/hooks";
import { Ingredient, MeasuredIngredient } from "types";

interface RecipeIngredientProps {
    ingredient: MeasuredIngredient;
}

const RecipeIngredient = ({ ingredient }: RecipeIngredientProps) => {
    const goToIngredientDetails = useCallback(() => {
        console.log(ingredient);
    }, [ingredient]);

    return (
        <List.Item
            key={ingredient.id}
            title={`${ingredient.label} | ${ingredient.quantity}g`}
            // description={ingredient.quantity}
            onPress={goToIngredientDetails}
            left={(props) => <List.Icon icon={"bottle-tonic"} {...props} />}
        />
    );
};

interface RecipeDetailsScreenProps {
    navigation: StackNavigationProp<RouteNavigationParams, SCREENS.RECIPE_DETAILS>,
    route: RouteProp<RouteNavigationParams, SCREENS.RECIPE_DETAILS>,
}

const RecipeDetailsScreen = ({ route: { params: { recipe } } }: RecipeDetailsScreenProps) => {
    const [favorite, setFavorite] = useState(false);

    const addOrRemoveFromFavorites = useCallback(() => {
        setFavorite((val) => !val);
    }, []);

    useScreenHeader({
        headerTitle: recipe.name,
        headerRight: (props) => <IconButton icon={favorite ? "star" : "star-outline"} iconColor={favorite ? "yellow": props.tintColor} onPress={addOrRemoveFromFavorites}/>
    }, [recipe, addOrRemoveFromFavorites, favorite]);

    const startRecipe = useCallback(() => {

    }, []);

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <MaterialCommunityIcons name={"glass-cocktail"} size={200} style={styles.icon} />
            <Text numberOfLines={3} variant={"bodyMedium"}>
                {`${"\t"}` + recipe.description}
            </Text>
            <View style={styles.ingredients}>
                {
                    recipe.ingredients.map((ingredient) => <RecipeIngredient ingredient={ingredient} />)
                }
            </View>
            <Button mode={"contained"} style={styles.button} onPress={startRecipe} textColor={"white"}>
                Start recipe
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        // flexGrow: 1,
        // justifyContent: "center",
        padding: 16,
    },
    icon: {
        alignSelf: "center",
        marginVertical: 20,
    },
    ingredients: {
        marginTop: 16,
    },
    button: {
        width: "80%",
        alignSelf: "center",
        marginVertical: 20
    }
});

export default RecipeDetailsScreen;
