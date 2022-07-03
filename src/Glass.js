import React, { useCallback, useState } from "react";
import { View, StyleSheet, Dimensions, Slider, Text, Button } from "react-native";
import Svg, { Circle, Path, Rect, Ellipse, Line } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, Value, withTiming, Easing } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Glass = () => {
    const width = Dimensions.get("window").width * 0.9;
    const [value, setValue] = useState(5);
    const fill = useSharedValue(0.5);

    const add = useCallback(() => {
       fill.value = withTiming(0.8, {duration: 2000, easing: Easing.inOut(Easing.ease)})
    }, []);

    const remove = useCallback(() => {
        fill.value = withTiming(0.1, {duration: 2000, easing: Easing.inOut(Easing.ease)})
    }, [])

    const animatedProps = useAnimatedProps(() => ({
        d: `M ${10 + 10 * (1-fill.value)} ${10 + 80 * (1 - fill.value)} l ${10 * fill.value} ${80 * fill.value} c 0 12, 60 12, 60 0 l ${10 * fill.value} -${80 * fill.value} c 0 12, -${60 + 20 * fill.value} 12, -${60 + 20 * fill.value} 0`
    }))

    console.log("rendering");
    return (
        <View style={styles.container}>
            <Svg height={width} width={width} viewBox={[0, 0, 100, 100]}>
                <AnimatedPath
                    animatedProps={animatedProps}
                    // d={`M ${10 + 10 * (1-fill.value)} ${10 + 80 * (1 - fill.value)} l ${10 * fill.value} ${80 * fill.value} c 0 12, 60 12, 60 0 l ${10 * fill.value} -${80 * fill.value} c 0 12, -${60 + 20 * fill.value} 12, -${60 + 20 * fill.value} 0`}
                    fill={"red"}
                />
                <Path d="M 10 10 l 10 80 c 0 12, 60 12, 60 0 l 10 -80 c 0 12, -80 12, -80 0"
                      stroke="black"
                      strokeWidth={2}
                      fill={"blue"}
                      fillOpacity={0.3}
                />
                <Path d="M 10 10 c 0 -12, 80 -12, 80 0 c 0 12, -80 12, -80 0"
                      stroke="black"
                      strokeWidth={2}
                      fill={"blue"}
                      fillOpacity={0.15}
                />
            </Svg>
            <Button title={"add"} onPress={add}/>
            <Button title={"remove"} onPress={remove}/>
            <Text>
                {value}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf3b9",
        justifyContent: "center",
        alignItems: "center",
    },
});


export default Glass;
