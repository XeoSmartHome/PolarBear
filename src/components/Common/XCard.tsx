import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

type XCardProps = {
    children: ReactNode
}

const XCard = ({children}: XCardProps) => {
    return (
        <Surface style={styles.card}>
            {children}
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 16
    }
});

export default XCard;
