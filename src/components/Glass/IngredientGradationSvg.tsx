import React, { useEffect } from "react";
import { Path, Text, TextPath, Defs } from "react-native-svg";
import Animated, { Easing, interpolateColor, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import { MeasuredIngredient } from 'types';

type Props = {
    ingredient: MeasuredIngredient,
    targetLevel: number,
    glassTopWidth: number,
    glassBottomWidth: number,
    glassHeight: number,
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const IngredientGradationSvg = ({ ingredient, glassHeight, glassTopWidth, glassBottomWidth, targetLevel }: Props) => {
    const startX = 100 + (glassTopWidth - glassBottomWidth) / 2 * (1 - targetLevel);
    const startY = 100 + glassHeight * (1 - targetLevel);
    const width = glassBottomWidth + (glassTopWidth - glassBottomWidth) * targetLevel;

    const color = useSharedValue<number>(0);
    const checked = false;

    useEffect(() => {
        color.value = withTiming(checked ? 1 : 0, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease)
        });
    }, [checked]);

    const lineAnimatedProps = useAnimatedProps(() => ({
        stroke: interpolateColor(color.value, [0, 1], ["white", "#5ade11"])
    }));

    const textAnimatedProps = useAnimatedProps(() => ({
        fill: interpolateColor(color.value, [0, 1], ["white", "#5ade11"])
    }));

    return (
        <>
            <AnimatedPath
                animatedProps={lineAnimatedProps}
                d={`M ${startX} ${startY} c 0 120, ${width} 120, ${width} 0`}
                strokeDasharray={[30, 30]}
                strokeWidth={10}
                strokeOpacity={0.7}
            />
            <Defs>
                <Path id={`path-${ingredient.id}`} d={`M ${startX} ${startY} c 0 120, ${width} 120, ${width} 0`} />
            </Defs>
            {/*@ts-ignore*/}
            <AnimatedText
                animatedProps={textAnimatedProps}
                fontSize={48}
                fontWeight={"600"}
                // fill={interpolatedColor}
                strokeWidth={0}
                textAnchor="middle"
                opacity={0.7}
                dy={60}
            >
                {/*@ts-ignore*/}
                <TextPath href={`#path-${ingredient.id}`} startOffset={"50%"} fill={"white"}>
                    {ingredient.label}
                </TextPath>
            </AnimatedText>
        </>
    );
};

export default IngredientGradationSvg;
