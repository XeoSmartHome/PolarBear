import React, { useEffect } from 'react';
import { Path } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LiquidSvgProps {
    bottomLevel: number;
    upperLevel: number;
    color: string;
    isLast?: boolean;
}

const GLASS_X = 100;
const GLASS_Y = 100;
const BASE_WIDTH = 600;
const TOP_WIDTH = 800;
const HEIGHT = 800;
const CURVATURE = 120;

const LiquidSvg = ({
    bottomLevel,
    upperLevel,
    color,
    isLast,
}: LiquidSvgProps) => {
    const _upperLevel = useSharedValue(upperLevel);

    useEffect(() => {
        _upperLevel.value = withTiming(upperLevel, { duration: 500 });
    }, [upperLevel]);

    const liquidPath = useAnimatedProps(() => {
        const upLeft = {
            x: ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - _upperLevel.value),
            y: HEIGHT * (1 - _upperLevel.value),
        };
        const downLeft = {
            x: ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - bottomLevel),
            y: HEIGHT * (1 - bottomLevel),
        };
        const downRight = {
            x: TOP_WIDTH - ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - bottomLevel),
            y: HEIGHT * (1 - bottomLevel),
        };
        const upRight = {
            x:
                TOP_WIDTH -
                ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - _upperLevel.value),
            y: HEIGHT * (1 - _upperLevel.value),
        };
        return {
            d: `M ${upLeft.x} ${upLeft.y} 
            L ${downLeft.x} ${downLeft.y} 
            C ${downLeft.x} ${downLeft.y + CURVATURE} ${downRight.x} ${
                downRight.y + CURVATURE
            } ${downRight.x} ${downRight.y} 
            L ${upRight.x} ${upRight.y} 
            C ${upRight.x} ${upRight.y + CURVATURE} ${upLeft.x} ${
                upLeft.y + CURVATURE
            } ${upLeft.x} ${upLeft.y}`,
        };
    }, []);

    const liquidSurfacePath = useAnimatedProps(() => {
        const upLeft = {
            x: ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - _upperLevel.value),
            y: HEIGHT * (1 - _upperLevel.value),
        };
        const upRight = {
            x:
                TOP_WIDTH -
                ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - _upperLevel.value),
            y: HEIGHT * (1 - _upperLevel.value),
        };

        return {
            d: `M ${upLeft.x} ${upLeft.y} 
            C ${upLeft.x} ${upLeft.y + CURVATURE} ${upRight.x} ${
                upRight.y + CURVATURE
            } ${upRight.x} ${upRight.y} 
            C ${upRight.x} ${upRight.y - CURVATURE} ${upLeft.x} ${
                upLeft.y - CURVATURE
            } ${upLeft.x} ${upLeft.y}`,
        };
    }, []);

    return (
        <>
            <AnimatedPath
                x={GLASS_X}
                y={GLASS_Y}
                animatedProps={liquidPath}
                fill={color}
                fillOpacity={0.9}
            />
            {isLast && (
                <AnimatedPath
                    x={GLASS_X}
                    y={GLASS_Y}
                    animatedProps={liquidSurfacePath}
                    fill={color}
                    fillOpacity={1}
                />
            )}
        </>
    );
};

export default LiquidSvg;
