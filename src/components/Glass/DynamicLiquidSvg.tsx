import React from 'react';
import { StyleSheet } from 'react-native';
import LiquidSvg from 'components/Glass/LiquidSvg';
import { GlassDimensions } from 'components/Glass/dimensions';
import { MeasuredIngredient } from 'types';
import { useAppSelector } from 'store';
import { selectCurrentMass } from 'store/ActiveRecipe/selectors';

type DynamicLiquidSvgProps = {
    index: number
    ingredientsNumber: number
    ingredient: MeasuredIngredient
    dimensions: GlassDimensions
    color: string
}

const DynamicLiquidSvg = ({dimensions, color, index, ingredientsNumber, ingredient}: DynamicLiquidSvgProps) => {
    const currentMass = useAppSelector(selectCurrentMass);

    const bottomLevel = index / (ingredientsNumber + 1);
    const upperLevel =
        bottomLevel +
        Math.max(
            0,
            currentMass /
            ingredient.quantity /
            (ingredientsNumber + 1),
        );
    return (
        <LiquidSvg
            bottomLevel={bottomLevel}
            upperLevel={upperLevel}
            color={color}
            dimensions={dimensions}
            />
    );
};

const styles = StyleSheet.create({});

export default DynamicLiquidSvg;
