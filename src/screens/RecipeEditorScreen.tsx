import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useScreenHeader } from 'navigation/hooks';
import { RouteProp } from '@react-navigation/native';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import XTextInput from 'components/Common/XTextInput';
import { useForm } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { customRecipesActions } from 'store/CustomRecipes/slice';

type RecipeEditorScreenProps = {
    route: RouteProp<RouteNavigationParams, SCREENS.RECIPE_EDITOR>;
};

enum RECIPE_FIELDS {
    NAME = 'name',
}

const RecipeEditorScreen = ({ route: { params } }: RecipeEditorScreenProps) => {
    useScreenHeader({
        title: params.scope === 'new' ? 'New recipe' : params.recipe.name,
    });

    const { control, handleSubmit, getValues } = useForm({
        defaultValues: {
            [RECIPE_FIELDS.NAME]: '',
        },
    });
    const dispatch = useDispatch();

    const createOrUpdateRecipe = useCallback(() => {
        const { name } = getValues();
        dispatch(
            customRecipesActions.addRecipe({
                id: `${Math.random()}`,
                name,
                description: name,
                ingredients: [],
                tags: [],
            }),
        );
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'}>
            <XTextInput
                control={control}
                name={RECIPE_FIELDS.NAME}
                label={'Name'}
            />
            <Button
                onPress={handleSubmit(createOrUpdateRecipe)}
                mode={'contained'}>
                Create new recipe
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default RecipeEditorScreen;
