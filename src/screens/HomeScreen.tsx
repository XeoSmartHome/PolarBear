import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useScreenHeader } from 'navigation/hooks';
import { Button, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import { RouteProp } from '@react-navigation/native';
import { useAppSelector } from 'store';
import { selectIsConnected } from 'store/Bluetooth/selectors';
import Glass from 'components/Glass';
import {
    selectActiveRecipeIngredients,
    selectCurrentIngredient,
} from 'store/ActiveRecipe/selectors';
import { MeasuredIngredient } from 'types';
// import ScaleSvgV2 from 'components/Svg/ScaleSvgV2';
// import Ionicons from 'react-native-vector-icons/Ionicons';

interface HomeScreenProps {
    navigation: StackNavigationProp<RouteNavigationParams, SCREENS.HOME>;
    route: RouteProp<RouteNavigationParams, SCREENS.HOME>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    useScreenHeader({
        header: () => null,
    });
    const currentIngredient = useAppSelector(selectCurrentIngredient);
    const ingredients = useAppSelector(selectActiveRecipeIngredients);

    const goToDevicesScreen = useCallback(() => {
        navigation.navigate(SCREENS.SCAN_DEVICES);
    }, [navigation]);

    const goToRecipesListScreen = useCallback(() => {
        navigation.navigate(SCREENS.RECIPES_LIST);
    }, [navigation]);

    const goToGlassCustomizationScreenScreen = useCallback(() => {
        navigation.navigate(SCREENS.CUSTOMIZE_GLASS);
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <Text>{currentIngredient?.label}</Text>
            <TouchableOpacity onLongPress={goToGlassCustomizationScreenScreen}>
                <Glass
                    width={Dimensions.get('window').width}
                    ingredients={ingredients}
                    currentIngredient={currentIngredient as MeasuredIngredient}
                    glassBorder={'white'}
                />
            </TouchableOpacity>
            {/*<ScaleSvgV2 />*/}
            <Button
                mode={'contained'}
                style={styles.button}
                onPress={goToRecipesListScreen}>
                Select recipe
            </Button>
            <Button
                mode={'outlined'}
                style={styles.button}
                onPress={goToDevicesScreen}>
                Connect device
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 15,
        width: '75%',
    },
});

export default HomeScreen;
