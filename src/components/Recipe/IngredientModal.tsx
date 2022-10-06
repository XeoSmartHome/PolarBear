import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Surface } from 'react-native-paper';
import { MeasuredIngredient } from 'types';
import { useForm } from 'react-hook-form';
import XTextInput from 'components/Common/XTextInput';

type IngredientModalProps = {
    visible: boolean;
    onDismiss: (ingredient: MeasuredIngredient) => void;
    ingredient?: MeasuredIngredient;
};

enum INGREDIENT_FORM {
    LABEL = 'label',
}

const IngredientModal = ({
    ingredient,
    visible,
    onDismiss,
}: IngredientModalProps) => {
    const { control, getValues, handleSubmit } = useForm({
        defaultValues: {
            [INGREDIENT_FORM.LABEL]: '',
        },
    });

    const closeModal = useCallback(() => {
        if (ingredient) {
            onDismiss(ingredient);
        }
    }, [onDismiss]);

    return (
        <Modal visible={visible} onDismiss={closeModal}>
            <Surface style={styles.card}>
                <XTextInput control={control} name={INGREDIENT_FORM.LABEL} />
            </Surface>
        </Modal>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 8,
        borderRadius: 16,
        margin: 16,
    },
});

export default IngredientModal;
