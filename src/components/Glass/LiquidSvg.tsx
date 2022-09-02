import React, { useEffect } from 'react';
import { Path } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
// import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
// import LPF from "lpf";


// setUpdateIntervalForType(SensorTypes.accelerometer, 100)
//
// LPF.init([]);
// LPF.smoothing = 1;

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LiquidSvgProps {
    bottomLevel: number;
    upperLevel: number;
    color: string;
    isFirst?: boolean
}

const GLASS_X = 100;
const GLASS_Y = 100;
const BASE_WIDTH = 600;
const TOP_WIDTH = 800;
const HEIGHT = 800;
const CURVATURE = 120;

const LiquidSvg = ({ bottomLevel, upperLevel, color, isFirst }: LiquidSvgProps) => {
    const _upperLevel = useSharedValue(upperLevel);
    const _levelDifference = useSharedValue(0);

    useEffect(() => {
        _upperLevel.value = withTiming(upperLevel, { duration: 500 });
    }, [upperLevel]);

    // useEffect(() => {
    //     // _levelDifference.value = withRepeat(
    //     //     withTiming(0.05, {
    //     //         duration: 500
    //     //     }),
    //     //     -1,
    //     //     true
    //     // )
    //     // _levelDifference.value = withTiming(0.1, { duration: 500 });
    //     const subscription = accelerometer.subscribe(({ x }) => {
    //         // const pitch = (Math.atan2(-x, -z) * 180) / Math.PI; // In degrees
    //         // const roll = (Math.atan2(-y, -x) * 180) / Math.PI; // In degrees
    //         // const yaw = (Math.atan2(y, -z) * 180) / Math.PI; // In degrees
    //         console.log(x);
    //         _levelDifference.value = withTiming(-x / 50, { duration: 250 });
    //     });
    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // }, []);

    const liquidPath = useAnimatedProps(() => {
        const upLeft = {
            x: ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - _upperLevel.value),
            y: HEIGHT * (1 - _upperLevel.value + _levelDifference.value),
        };
        const downLeft = {
            x: ((TOP_WIDTH - BASE_WIDTH) / 2) * (1 - bottomLevel),
            y: HEIGHT * (1 - bottomLevel +( !isFirst ? _levelDifference.value : 0)),
        };
        const downRight = {
            x:
                TOP_WIDTH -
                ((TOP_WIDTH - BASE_WIDTH) / 2) *
                    (1 - bottomLevel -( !isFirst ? _levelDifference.value : 0)),
            y: HEIGHT * (1 - bottomLevel - ( !isFirst ? _levelDifference.value : 0)),
        };
        const upRight = {
            x:
                TOP_WIDTH -
                ((TOP_WIDTH - BASE_WIDTH) / 2) *
                    (1 - _upperLevel.value - _levelDifference.value),
            y: HEIGHT * (1 - _upperLevel.value - _levelDifference.value),
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
            x:
                ((TOP_WIDTH - BASE_WIDTH) / 2) *
                (1 - _upperLevel.value + _levelDifference.value),
            y: HEIGHT * (1 - _upperLevel.value + _levelDifference.value),
        };
        const upRight = {
            x:
                TOP_WIDTH -
                ((TOP_WIDTH - BASE_WIDTH) / 2) *
                    (1 - _upperLevel.value - _levelDifference.value),
            y: HEIGHT * (1 - _upperLevel.value - _levelDifference.value),
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
                fillOpacity={0.5}
            />
            <AnimatedPath
                x={GLASS_X}
                y={GLASS_Y}
                animatedProps={liquidSurfacePath}
                fill={color}
                fillOpacity={0.6}
            />
        </>
    );
};

export default LiquidSvg;
