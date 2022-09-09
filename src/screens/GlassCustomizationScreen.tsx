import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import Glass from 'components/Glass/AnimatedGlass';

const GlassCustomizationScreen = () => {
    return (
        <ScrollView>
            <View>
                <Glass
                    dimensions={{ height: 800, topWidth: 800, bottomWidth: 600, padding: 100, roundness: 50 }}
                    width={Dimensions.get('window').width * 0.9}
                    ingredients={[]}
                    glassBorder={'white'}
                />
            </View>
            <Tabs disableSwipe={false}>
                <TabScreen label={"Color"}>
                    <View>

                    </View>
                </TabScreen>
                <TabScreen label={"Border color"}>
                    <View>

                    </View>
                </TabScreen>
            </Tabs>
        </ScrollView>
    )
}

const styles =StyleSheet.create({

})

export default GlassCustomizationScreen;
