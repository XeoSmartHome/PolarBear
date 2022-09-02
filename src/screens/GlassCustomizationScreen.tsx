import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import Glass from 'components/Glass';

const GlassCustomizationScreen = () => {
    return (
        <ScrollView>
            <View>
                <Glass
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
