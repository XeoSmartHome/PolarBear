import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Searchbar } from "react-native-paper";
// @ts-ignore
import debounce from 'lodash.debounce';
import { Ingredient } from "types";

interface RecipesListHeaderProps {
    onChangeSearchValue: (value: string) => void;
    ingredients: Ingredient[];
}

const RecipesListHeader = ({onChangeSearchValue, ingredients}: RecipesListHeaderProps) => {
    const [value, setValue] = useState("");

    const debounceOnChangeSearchValue = useMemo(() => debounce(onChangeSearchValue, 200), []);

    const onChangeText = useCallback((newValue: string) => {
        setValue(newValue);
        debounceOnChangeSearchValue(newValue);
    }, [onChangeSearchValue]);

    return (
        <View>
            <Searchbar value={value} onChangeText={onChangeText} />
            <View style={styles.ingredients}>
                {ingredients.map((ingredient) => (
                    <Chip
                        key={ingredient.id}
                        mode={"outlined"}
                        style={styles.ingredient}
                    >
                        {ingredient.label}
                    </Chip>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ingredients: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    ingredient: {
        marginVertical: 4,
        marginHorizontal: 6
    }
});

export default RecipesListHeader;
