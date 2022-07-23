import React, { useEffect, useMemo, useState } from "react";
import { Button, Dimensions, StyleSheet, View, Text } from "react-native";
import Glass from "../components/Glass";

const ingredients = [
    {
        name: "Ice",
        quantity: 100,
        color: "gray"
    },
    {
        name: "Vodka",
        quantity: 70,
        color: "green"
    },
    {
        name: "Orange juice",
        quantity: 120,
        color: "orange"
    },
];


const MakeCocktailScreen = () => {
    const [level, setLevel] = useState<number>(0.0001);

    const totalTargetQuantity = useMemo(() =>
        ingredients.reduce((q1, {quantity: q2}) => q1 + q2, 100)
    , [ingredients]);

    const mappedIngredients = useMemo(() => {
        let targetLevel = 0;
        return ingredients.map( (ingredient) => {
            targetLevel += ingredient.quantity / totalTargetQuantity;
            return {...ingredient, targetLevel};
        });
    }, [ingredients, totalTargetQuantity]);

    const [currentIngredient, setCurrentIngredient] = useState(mappedIngredients[0]);


    useEffect(() => {
        if (level > currentIngredient.targetLevel) {
            setCurrentIngredient(mappedIngredients[Math.min(mappedIngredients.indexOf(currentIngredient) + 1, mappedIngredients.length - 1)])
        }
    }, [mappedIngredients, level]);

    return (
        <View style={styles.screen}>
            <Text style={styles.ingredient}>
                {currentIngredient.name}
            </Text>
            <Glass width={Dimensions.get("screen").width * 0.8} level={level} color={currentIngredient.color} ingredients={mappedIngredients}/>
            <Button title={"add"} onPress={() => setLevel((level) => level + 0.05)} />
            <Button title={"remove"} onPress={() => setLevel((level) => Math.max(level - 0.05, 0.001))} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ingredient: {
        fontSize: 20,
        fontWeight: "800",
        padding: 20
    }
});

export default MakeCocktailScreen;
