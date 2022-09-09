import React, { useEffect } from 'react';
import { Path } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { GlassDimensions } from 'components/Glass/dimensions';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LiquidSvgProps {
    bottomLevel: number;
    upperLevel: number;
    color: string;
    isLast?: boolean;
    dimensions: GlassDimensions;
}

const LiquidSvg = ({
    bottomLevel,
    upperLevel,
    color,
    isLast,
    dimensions,
}: LiquidSvgProps) => {
    const _upperLevel = useSharedValue(upperLevel);

    useEffect(() => {
        _upperLevel.value = withTiming(upperLevel, { duration: 300 });
    }, [upperLevel]);

    const liquidPath = useAnimatedProps(() => {
        const upLeft = {
            x:
                ((dimensions.topWidth - dimensions.bottomWidth) / 2) *
                (1 - _upperLevel.value),
            y: dimensions.height * (1 - _upperLevel.value),
        };
        const downLeft = {
            x:
                ((dimensions.topWidth - dimensions.bottomWidth) / 2) *
                (1 - bottomLevel),
            y: dimensions.height * (1 - bottomLevel),
        };
        const downRight = {
            x:
                dimensions.topWidth -
                ((dimensions.topWidth - dimensions.bottomWidth) / 2) *
                    (1 - bottomLevel),
            y: dimensions.height * (1 - bottomLevel),
        };
        const upRight = {
            x:
                dimensions.topWidth -
                ((dimensions.topWidth - dimensions.bottomWidth) / 2) *
                    (1 - _upperLevel.value),
            y: dimensions.height * (1 - _upperLevel.value),
        };
        return {
            d: `M ${upLeft.x} ${upLeft.y} 
            L ${downLeft.x} ${downLeft.y} 
            C ${downLeft.x} ${downLeft.y + dimensions.roundness} ${
                downRight.x
            } ${downRight.y + dimensions.roundness} ${downRight.x} ${
                downRight.y
            } 
            L ${upRight.x} ${upRight.y} 
            C ${upRight.x} ${upRight.y + dimensions.roundness} ${upLeft.x} ${
                upLeft.y + dimensions.roundness
            } ${upLeft.x} ${upLeft.y}`,
        };
    }, [dimensions]);

    const liquidSurfacePath = useAnimatedProps(() => {
        const upLeft = {
            x:
                ((dimensions.topWidth - dimensions.bottomWidth) / 2) *
                (1 - _upperLevel.value),
            y: dimensions.height * (1 - _upperLevel.value),
        };
        const upRight = {
            x:
                dimensions.topWidth -
                ((dimensions.topWidth - dimensions.bottomWidth) / 2) *
                    (1 - _upperLevel.value),
            y: dimensions.height * (1 - _upperLevel.value),
        };

        return {
            d: `M ${upLeft.x} ${upLeft.y} 
            C ${upLeft.x} ${upLeft.y + dimensions.roundness} ${upRight.x} ${
                upRight.y + dimensions.roundness
            } ${upRight.x} ${upRight.y} 
            C ${upRight.x} ${upRight.y - dimensions.roundness} ${upLeft.x} ${
                upLeft.y - dimensions.roundness
            } ${upLeft.x} ${upLeft.y}`,
        };
    }, [dimensions]);

    return (
        <>
            <AnimatedPath
                x={dimensions.padding}
                y={dimensions.padding}
                animatedProps={liquidPath}
                fill={color}
                fillOpacity={0.5}
            />
            {isLast && (
                <AnimatedPath
                    x={dimensions.padding}
                    y={dimensions.padding}
                    animatedProps={liquidSurfacePath}
                    fill={color}
                    fillOpacity={0.6}
                />
            )}
        </>
    );
};

export default LiquidSvg;
