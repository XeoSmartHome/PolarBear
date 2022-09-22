import React from 'react';
import { ScrollView, StyleSheet,  } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useScreenHeader } from 'navigation/hooks';
import SettingsHeader from 'components/Settings/SettingsHeader';

type SettingsScreenProps = {};

const SettingsScreen = ({}: SettingsScreenProps) => {
    useScreenHeader({
        title: "Settings"
    });

    return (
        <ScrollView>
            <SettingsHeader/>
            <Divider/>
            <List.Item title={'Language'} description={"English"}/>
            <Divider/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
