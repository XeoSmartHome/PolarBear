import React, { useEffect } from 'react';
import { Path, Text, TextPath, Defs } from 'react-native-svg';
import Animated, {
    Easing,
    interpolateColor,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { MeasuredIngredient } from 'types';
import { GlassDimensions } from 'components/Glass/dimensions';

type Props = {
    ingredient: MeasuredIngredient;
    targetLevel: number;
    dimensions: GlassDimensions;
};

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const IngredientGradationSvg = ({
    ingredient,
    targetLevel,
    dimensions
}: Props) => {
    const startX =
        dimensions.padding + ((dimensions.topWidth - dimensions.bottomWidth) / 2) * (1 - targetLevel);
    const startY = dimensions.padding + dimensions.height * (1 - targetLevel);
    const width =
        dimensions.bottomWidth + (dimensions.topWidth - dimensions.bottomWidth) * targetLevel;

    const color = useSharedValue<number>(0);
    const checked = false;

    useEffect(() => {
        color.value = withTiming(checked ? 1 : 0, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
        });
    }, [checked]);

    const lineAnimatedProps = useAnimatedProps(() => ({
        stroke: interpolateColor(color.value, [0, 1], ['white', '#5ade11']),
    }));

    const textAnimatedProps = useAnimatedProps(() => ({
        fill: interpolateColor(color.value, [0, 1], ['white', '#5ade11']),
    }));

    return (
        <>
            <AnimatedPath
                animatedProps={lineAnimatedProps}
                d={`M ${startX} ${startY} c 0 ${dimensions.roundness}, ${width} ${dimensions.roundness}, ${width} 0`}
                strokeDasharray={[15, 15]}
                strokeWidth={6}
                strokeOpacity={0.7}
            />
            <Defs>
                <Path
                    id={`path-${ingredient.id}`}
                    d={`M ${startX} ${startY} c 0 ${dimensions.roundness}, ${width} ${dimensions.roundness}, ${width} 0`}
                />
            </Defs>
            {/*@ts-ignore*/}
            <AnimatedText
                animatedProps={textAnimatedProps}
                fontSize={28}
                fontWeight={'600'}
                // fill={interpolatedColor}
                strokeWidth={0}
                textAnchor="middle"
                opacity={0.7}
                dy={30}>
                {/*@ts-ignore*/}
                <TextPath
                    href={`#path-${ingredient.id}`}
                    startOffset={'50%'}
                    fill={'white'}>
                    {ingredient.label}
                </TextPath>
            </AnimatedText>
        </>
    );
};

export default IngredientGradationSvg;
