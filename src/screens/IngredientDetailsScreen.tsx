import React from "react";
import { ScrollView } from "react-native";
import { useScreenHeader } from "navigation/hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationParams } from "navigation/types";
import { SCREENS } from "navigation/SCREENS";
import { RouteProp } from "@react-navigation/native";

interface IngredientDetailsScreenProps {
    navigation: StackNavigationProp<RouteNavigationParams, SCREENS.INGREDIENT_DETAILS>,
    route: RouteProp<RouteNavigationParams, SCREENS.INGREDIENT_DETAILS>,
}

const IngredientDetailsScreen = ({route: {params: {ingredient}}}: IngredientDetailsScreenProps) => {
    useScreenHeader({
        headerTitle: ingredient.label,
    }, []);

    return (
        <ScrollView>

        </ScrollView>
    );
};


export default IngredientDetailsScreen;
