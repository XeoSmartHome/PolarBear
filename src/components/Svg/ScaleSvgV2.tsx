import React from 'react';
import Svg, { Path, Rect, Text } from 'react-native-svg';

const ScaleSvg = () => {
    const fillColor = "#cfcfcf";

    return (
        <Svg height={170} width={340} viewBox={[0, 0, 500, 230].join(' ')}>
            <Path
                d={
                    'M 10 10 l 20 0 l 0 40 l 440 0 l 0 -40 l 20 0 l 0 60 l -480 0 Z'
                }
                fill={fillColor}
            />
            <Rect x={220} y={69} width={60} height={30} fill={fillColor} />
            <Rect
                x={10}
                y={98}
                width={480}
                height={120}
                ry={10}
                rx={10}
                fill={fillColor}
            />
        </Svg>
    );
};

export default ScaleSvg;
