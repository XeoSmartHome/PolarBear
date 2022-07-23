import React from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps{

}

const PBText = ({ style, ...props }: Props) => {
    return (
        <Text style={[style, {color: "black"}]} {...props}/>
    );
};

export default PBText;
