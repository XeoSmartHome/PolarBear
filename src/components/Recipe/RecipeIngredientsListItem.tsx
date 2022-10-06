import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { MeasuredIngredient } from 'types';

type RecipeIngredientsListItemProps = {
    ingredient: MeasuredIngredient;
    onEditPress?: (ingredient: MeasuredIngredient) => void;
};

const RecipeIngredientsListItem = ({
    ingredient,
    onEditPress,
}: RecipeIngredientsListItemProps) => {
    const _onEditPress = useCallback(() => {
        onEditPress?.(ingredient);
    }, [onEditPress, ingredient]);

    return (
        <List.Item
            key={ingredient.id}
            title={`${ingredient.quantity}ml - ${ingredient.label}`}
            titleNumberOfLines={1}
            style={{ justifyContent: 'center' }}
            titleEllipsizeMode={'middle'}
            left={props => <List.Icon icon={'bottle-tonic'} {...props} />}
            right={props => (
                <IconButton icon={'pencil'} onPress={_onEditPress} {...props} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default RecipeIngredientsListItem;
