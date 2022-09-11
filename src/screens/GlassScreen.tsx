import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppSelector } from 'store';
import Glass from 'components/Glass/AnimatedGlass';
import {
    selectActiveRecipeIngredients,
    selectCurrentIngredient,
} from 'store/ActiveRecipe/selectors';
import { MeasuredIngredient } from 'types';

interface GlassScreenProps {
    // jumpTo: (screen: SCREENS) => void;
}

const GlassScreen = ({}: GlassScreenProps) => {
    const currentIngredient = useAppSelector(selectCurrentIngredient);
    const ingredients = useAppSelector(selectActiveRecipeIngredients);

    const { width, height } = useWindowDimensions();

    return (
        <View style={styles.screen}>
            <Glass
                dimensions={{
                    height: height * 0.7,
                    topWidth: width,
                    bottomWidth: width * 0.8,
                    padding: 80,
                    roundness: 60,
                }}
                width={width}
                ingredients={ingredients}
                currentIngredient={currentIngredient as MeasuredIngredient}
                glassBorder={'white'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GlassScreen;
