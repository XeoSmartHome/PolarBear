import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
// @ts-ignore
import debounce from 'lodash.debounce';

interface RecipesListHeaderProps {
    onChangeSearchValue: (value: string) => void;
}

const RecipesListHeader = ({onChangeSearchValue}: RecipesListHeaderProps) => {
    const [value, setValue] = useState("");

    const debounceOnChangeSearchValue = useMemo(() => debounce(onChangeSearchValue, 200), []);

    const onChangeText = useCallback((newValue: string) => {
        setValue(newValue);
        debounceOnChangeSearchValue(newValue);
    }, [onChangeSearchValue]);

    return (
        <View>
            <Searchbar value={value} onChangeText={onChangeText} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default RecipesListHeader;
