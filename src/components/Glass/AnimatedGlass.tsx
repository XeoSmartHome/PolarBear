import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Color } from 'react-native-svg/lib/typescript/lib/extract/types';
import IngredientGradationSvg from './IngredientGradationSvg';
import { useAppSelector } from 'store';
import { selectCurrentMass } from 'store/ActiveRecipe/selectors';
import LiquidSvg from 'components/Glass/LiquidSvg';
import { MeasuredIngredient } from 'types';
import { GlassDimensions } from 'components/Glass/dimensions';
import DynamicLiquidSvg from 'components/Glass/DynamicLiquidSvg';

type Props = {
    width: number;
    glassBorder?: Color;
    glassColor?: Color;
    glassOpacity?: number;
    strokeWidth?: number;
    color?: Color;
    ingredients: MeasuredIngredient[];
    currentIngredient?: MeasuredIngredient;
    dimensions: GlassDimensions;
};

const colors = ['orange', 'purple', 'green', 'blue', 'yellow'];

const AnimatedGlass = ({
    width,
    color = 'blue',
    glassColor = 'gray',
    glassOpacity = 0.1,
    strokeWidth = 6,
    ingredients,
    glassBorder = 'black',
    currentIngredient,
    dimensions,
}: Props) => {
    const DynamicLiquid = useMemo(() => {
        if (!currentIngredient) {
            return null;
        }
        const currentIngredientIndex = ingredients.indexOf(currentIngredient);
        console.log('rendering dynamic ingredient');
        return (
            <DynamicLiquidSvg
                index={currentIngredientIndex}
                ingredientsNumber={ingredients.length}
                ingredient={currentIngredient}
                color={colors[currentIngredientIndex]}
                dimensions={dimensions}
            />
        );
    }, [dimensions, ingredients, currentIngredient]);

    const StaticLiquids = useMemo(() => {
        if (!currentIngredient) {
            return null;
        }
        const staticIngredients = ingredients.slice(
            0,
            ingredients.indexOf(currentIngredient),
        );
        return staticIngredients.map((ingredient, index) => {
            const bottomLevel = index / (ingredients.length + 1);
            const upperLevel = (index + 1) / (ingredients.length + 1);
            return (
                <LiquidSvg
                    key={ingredient.id}
                    bottomLevel={bottomLevel}
                    upperLevel={upperLevel}
                    color={colors[index]}
                    dimensions={dimensions}
                />
            );
        });
    }, [ingredients, currentIngredient, dimensions]);

    const GlassBackPaths = useMemo(() => {
        return (
            <Path
                d={`M ${
                    dimensions.padding +
                    (dimensions.topWidth - dimensions.bottomWidth) / 2
                } ${
                    dimensions.padding + dimensions.height
                } c 0 ${-dimensions.roundness} ${
                    dimensions.bottomWidth
                } ${-dimensions.roundness} ${dimensions.bottomWidth} 0`}
                stroke={glassBorder}
                strokeWidth={strokeWidth}
                opacity={0.25}
            />
        );
    }, [dimensions]);

    const GlassFrontPaths = useMemo(() => {
        return (
            <>
                <Path
                    d={`M ${dimensions.padding} ${dimensions.padding} l ${
                        (dimensions.topWidth - dimensions.bottomWidth) / 2
                    } ${dimensions.height} c 0 ${dimensions.roundness}, ${
                        dimensions.bottomWidth
                    } ${dimensions.roundness}, ${dimensions.bottomWidth} 0 l ${
                        (dimensions.topWidth - dimensions.bottomWidth) / 2
                    } -${dimensions.height} c 0 ${dimensions.roundness}, -${
                        dimensions.topWidth
                    } ${dimensions.roundness}, -${dimensions.topWidth} 00`}
                    stroke={glassBorder}
                    strokeWidth={strokeWidth}
                    fill={glassColor}
                    fillOpacity={glassOpacity}
                />
                <Path
                    d={`M ${dimensions.padding} ${dimensions.padding} c 0 -${dimensions.roundness}, ${dimensions.topWidth} -${dimensions.roundness}, ${dimensions.topWidth} 0 c 0 ${dimensions.roundness}, -${dimensions.topWidth} ${dimensions.roundness}, -${dimensions.topWidth} 0`}
                    stroke={glassBorder}
                    strokeWidth={strokeWidth}
                    fill={glassColor}
                    fillOpacity={glassOpacity / 2}
                />
            </>
        );
    }, [dimensions]);

    const IngredientsGradations = useMemo(() => {
        return ingredients.map((ingredient, index) => (
            <IngredientGradationSvg
                key={ingredient.id}
                ingredient={ingredient}
                targetLevel={(index + 1) / (ingredients.length + 1)}
                dimensions={dimensions}
            />
        ));
    }, [ingredients, currentIngredient, dimensions]);

    const totalHeight = dimensions.height + 2 * dimensions.padding;
    const totalWidth =
        Math.max(dimensions.topWidth, dimensions.bottomWidth) +
        2 * dimensions.padding;
    const aspectRatio = totalHeight / totalWidth;

    return (
        <Svg
            width={width}
            height={aspectRatio * width}
            viewBox={[0, 0, totalWidth, totalHeight].join(' ')}>
            {GlassBackPaths}
            {StaticLiquids}
            {DynamicLiquid}
            {IngredientsGradations}
            {GlassFrontPaths}
        </Svg>
    );
};

export default AnimatedGlass;
