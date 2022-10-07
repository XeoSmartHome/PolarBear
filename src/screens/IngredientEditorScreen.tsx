import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import XTextInput from 'components/Common/XTextInput';
import { useForm } from 'react-hook-form';
import { useScreenHeader } from 'navigation/hooks';
import { RouteProp } from '@react-navigation/native';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import XCard from 'components/Common/XCard';

type IngredientEditorScreenProps = {
    route: RouteProp<RouteNavigationParams, SCREENS.INGREDIENT_EDITOR>;
};

enum FORM {
    LABEL = 'label',
    QUANTITY = 'quantity',
}

const IngredientEditorScreen = ({
    route: { params },
}: IngredientEditorScreenProps) => {
    const { control, getValues, handleSubmit } = useForm({
        defaultValues: {
            [FORM.LABEL]: '',
        },
    });

    useScreenHeader({
        headerTitle: params.ingredient.label,
    });

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <XCard>
                <XTextInput
                    control={control}
                    name={FORM.LABEL}
                    label={'Ingredient'}
                />
                <XTextInput
                    control={control}
                    name={FORM.QUANTITY}
                    label={'Quantity'}
                    keyboardType={'number-pad'}
                />
            </XCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
    },
});

export default IngredientEditorScreen;
