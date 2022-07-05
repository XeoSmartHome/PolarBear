import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import Glass from "../Glass";
import Svg, { Defs, G, Path, TextPath, TSpan, Text } from "react-native-svg";

const MakeCocktailScreen = () => {
    const [level, setLevel] = useState<number>(0.2);

    return (
        <View style={styles.screen}>
            <Glass width={Dimensions.get("screen").width * 0.8} level={level} />
            <Button title={"add"} onPress={() => setLevel((level) => level + 0.101)}/>
            <Button title={"remove"} onPress={() => setLevel((level) => Math.max(level - 0.101, 0))}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MakeCocktailScreen;
