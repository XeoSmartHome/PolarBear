import React, { ReactNode, useEffect, useState } from "react";
import Svg, { Line, Path } from "react-native-svg";
import { Color } from "react-native-svg/lib/typescript/lib/extract/types";
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Gradation from "./Gradation";
import { useAppSelector } from "store";
import { selectCurrentMass } from "store/ActiveRecipe/selectors";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const BASE_WIDTH = 600;
const TOP_WIDTH = 800;
const HEIGHT = 800;

type LiquidProps = {
    color: Color
}

const Liquid = ({ color }: LiquidProps) => {
    const currentMass = useAppSelector(selectCurrentMass);
    const level = Math.max(0.01, currentMass /50);

    const fill = useSharedValue(0.1);

    useEffect(() => {
        fill.value = withTiming(level, {duration: 500, easing: Easing.inOut(Easing.ease)});
    }, [level]);

    const animatedProps = useAnimatedProps(() => ({
        d: `M ${100 + 100 * (1 - fill.value)} ${100 + 800 * (1 - fill.value)} l ${100 * fill.value} ${800 * fill.value} c 0 120, 600 120, 600 0 l ${100 * fill.value} -${800 * fill.value} c 0 120, -${600 + 200 * fill.value} 120, -${600 + 200 * fill.value} 0`,
    }));

    const animatedProps2 = useAnimatedProps(() => ({
        d: `M ${100 + 100 * (1 - fill.value)} ${100 + 800 * (1 - fill.value)} c 0 -120, ${600 + 200 * fill.value} -120, ${600 + 200 * fill.value} 0 c 0 120, -${600 + 200 * fill.value} 120, -${600 + 200 * fill.value} 0`,
    }));

    return (
        <>
            <AnimatedPath
                animatedProps={animatedProps}
                fill={color}
                fillOpacity={0.6}
            />
            <AnimatedPath
                animatedProps={animatedProps2}
                fill={color}
                fillOpacity={0.75 * 0.6}
            />
        </>
    );
};

type Props = {
    width: number,
    glassBorder?: Color,
    glassColor?: Color,
    glassOpacity?: number,
    strokeWidth?: number,
    color?: Color
    ingredients: any[]
};

const Index = ({ width, color = "blue", glassColor = "gray", glassOpacity = 0.1, strokeWidth = 10, ingredients, glassBorder = "black" }: Props) => {

    return (
        <Svg height={width} width={width} viewBox={[0, 0, 1000, 1000].join(" ")}>
            <Liquid color={color}/>
            <Path
                d={`M 100 100 l ${(TOP_WIDTH - BASE_WIDTH) / 2} ${HEIGHT} c 0 120, ${BASE_WIDTH} 120, ${BASE_WIDTH} 0 l ${(TOP_WIDTH - BASE_WIDTH) / 2} -${HEIGHT} c 0 120, -${TOP_WIDTH} 120, -${TOP_WIDTH} 00`}
                stroke={glassBorder}
                strokeWidth={strokeWidth}
                fill={glassColor}
                fillOpacity={glassOpacity}
            />
            <Path
                d={`M 100 100 c 0 -120, ${TOP_WIDTH} -120, ${TOP_WIDTH} 0 c 0 120, -${TOP_WIDTH} 120, -${TOP_WIDTH} 0`}
                stroke={glassBorder}
                strokeWidth={strokeWidth}
                fill={glassColor}
                fillOpacity={glassOpacity / 2}
            />
            {/*<Gradation level={0.4} label={"Apple juice"} glassBottomWidth={BASE_WIDTH}*/}
            {/*           glassTopWidth={TOP_WIDTH} glassHeight={HEIGHT} checked={level > 0.4} />*/}
            {/*<Gradation level={0.6} label={"Vodka"} glassBottomWidth={BASE_WIDTH} glassTopWidth={TOP_WIDTH}*/}
            {/*           glassHeight={HEIGHT} checked={level > 0.6} />*/}
            {
                ingredients.map(
                    (ingredient) =>
                        <Gradation
                            key={ingredient?.name}
                            level={ingredient?.targetLevel || 0}
                            label={ingredient?.name}
                            glassTopWidth={TOP_WIDTH}
                            glassBottomWidth={BASE_WIDTH}
                            glassHeight={HEIGHT}
                            checked={false}
                    />
                )
            }
        </Svg>
    );
};

export default Index;
