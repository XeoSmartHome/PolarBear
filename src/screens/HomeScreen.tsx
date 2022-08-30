import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useScreenHeader } from "navigation/hooks";
import { Button, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteNavigationParams } from "navigation/types";
import { SCREENS } from "navigation/SCREENS";
import { RouteProp } from "@react-navigation/native";
import { useAppSelector } from "store";
import { selectIsConnected } from "store/Bluetooth/selectors";
import Glass from "components/Glass";
import { selectCurrentIngredient, selectCurrentMass } from "store/ActiveRecipe/selectors";

interface HomeScreenProps {
    navigation: StackNavigationProp<RouteNavigationParams, SCREENS.HOME>,
    route: RouteProp<RouteNavigationParams, SCREENS.HOME>,
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    useScreenHeader({
        header: () => null,
    });
    const deviceIsConnected = useAppSelector(selectIsConnected);
    const currentIngredient = useAppSelector(selectCurrentIngredient);

    const goToDevicesScreen = useCallback(() => {
        navigation.navigate(SCREENS.SCAN_DEVICES);
    }, [navigation]);

    const goToRecipesListScreen = useCallback(() => {
        navigation.navigate(SCREENS.RECIPES_LIST);
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <Text variant={"titleLarge"}>
                {currentIngredient?.label}
            </Text>
            <Glass width={Dimensions.get("window").width * 0.9} ingredients={[]}
                   glassBorder={"white"} />
            <Button mode={"contained"} style={styles.button} onPress={goToRecipesListScreen}>
                Select recipe
            </Button>
            <Button mode={"elevated"} style={styles.button} onPress={goToDevicesScreen}>
                Connect device
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 30,
        width: "75%",
    },
});

export default HomeScreen;
