import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

type SettingsHeaderProps = {}

const SettingsHeader = ({}: SettingsHeaderProps) => {
    return (
        <View style={styles.container}>
            <Avatar.Icon icon={"folder"} style={styles.avatarIcon} size={120}/>
            <Text variant={"headlineSmall"}>
                Create account
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        alignItems: 'center'
    },
    avatarIcon: {
    }
});

export default SettingsHeader;
