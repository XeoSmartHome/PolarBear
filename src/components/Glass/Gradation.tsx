import React, { useEffect } from "react";
import { Path, Text, G, TextPath, TSpan, Defs } from "react-native-svg";
import Animated, { Easing, interpolateColor, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
    level: number,
    label: string,
    glassTopWidth: number,
    glassBottomWidth: number,
    glassHeight: number,
    checked: boolean
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Gradation = ({ level, label, glassHeight, glassTopWidth, glassBottomWidth, checked }: Props) => {
    const startX = 100 + (glassTopWidth - glassBottomWidth) / 2 * (1 - level);
    const startY = 100 + glassHeight * (1 - level);
    const width = glassBottomWidth + (glassTopWidth - glassBottomWidth) * level;
    console.log(level);

    const color = useSharedValue<number>(0);

    useEffect(() => {
        color.value = withTiming(checked ? 1 : 0, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease)
        });
    }, [checked]);

    const lineAnimatedProps = useAnimatedProps(() => ({
        stroke: interpolateColor(color.value, [0, 1], ["black", "#5ade11"])
    }));

    const textAnimatedProps = useAnimatedProps(() => ({
        fill: interpolateColor(color.value, [0, 1], ["black", "#5ade11"])
    }));

    return (
        <>
            <AnimatedPath
                animatedProps={lineAnimatedProps}
                d={`M ${startX} ${startY} c 0 120, ${width} 120, ${width} 0`}
                stroke={"black"}
                strokeDasharray={[30, 30]}
                strokeWidth={10}
                strokeOpacity={0.7}
            />
            <Defs>
                <Path id={`path-${label}`} d={`M ${startX} ${startY} c 0 120, ${width} 120, ${width} 0`} />
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
                <TextPath href={`#path-${label}`} startOffset={"50%"}>
                    {label}
                </TextPath>
            </AnimatedText>
        </>
    );
};

export default Gradation;
