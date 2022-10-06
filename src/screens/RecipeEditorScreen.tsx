import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useScreenHeader } from 'navigation/hooks';
import { RouteProp } from '@react-navigation/native';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import XTextInput from 'components/Common/XTextInput';
import { useForm } from 'react-hook-form';
import { Button, Surface } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { customRecipesActions } from 'store/CustomRecipes/slice';
import { MeasuredIngredient } from 'types';
import RecipeIngredientsListItem from 'components/Recipe/RecipeIngredientsListItem';
import { StackNavigationProp } from '@react-navigation/stack';

type RecipeEditorScreenProps = {
    navigation: StackNavigationProp<RouteNavigationParams, SCREENS.RECIPE_EDITOR>
    route: RouteProp<RouteNavigationParams, SCREENS.RECIPE_EDITOR>;
};

enum RECIPE_FIELDS {
    NAME = 'name',
    DESCRIPTION = 'description',
}

const RecipeEditorScreen = ({ route: { params }, navigation }: RecipeEditorScreenProps) => {
    const dispatch = useDispatch();
    const [ingredients, setIngredients] = useState<MeasuredIngredient[]>([
        { id: '1', label: 'asd', quantity: 100 },
    ]);

    const { control, handleSubmit, getValues, setFocus } = useForm({
        defaultValues: {
            [RECIPE_FIELDS.NAME]: '',
            [RECIPE_FIELDS.DESCRIPTION]: '',
        },
    });

    const openAddIngredientModal = useCallback(() => {}, []);

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

    useScreenHeader({
        title: params.scope === 'new' ? 'New recipe' : params.recipe.name,
        headerRight: props => (
            <Button mode={'text'} onPress={handleSubmit(createOrUpdateRecipe)}>
                SAVE
            </Button>
        ),
        headerRightContainerStyle: {
            paddingRight: 8,
        },
    });

    const goToIngredientEditorScreen = useCallback((ingredient: MeasuredIngredient) => {
        navigation.navigate(SCREENS.INGREDIENT_EDITOR, {ingredient});
    }, []);

    const renderIngredient = useCallback((ingredient: MeasuredIngredient) => {
        return (
            <RecipeIngredientsListItem
                ingredient={ingredient}
                key={`ingredient-${ingredient.id}`}
                onEditPress={goToIngredientEditorScreen}
            />
        );
    }, [goToIngredientEditorScreen]);

    const focusDescription = useCallback(() => {
        setFocus(RECIPE_FIELDS.DESCRIPTION);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'}>
            <Surface style={styles.card}>
                <XTextInput
                    control={control}
                    name={RECIPE_FIELDS.NAME}
                    label={'Name'}
                    blurOnSubmit={false}
                    onSubmitEditing={focusDescription}
                    autoCapitalize={'sentences'}
                />
                <XTextInput
                    control={control}
                    name={RECIPE_FIELDS.DESCRIPTION}
                    label={'Description'}
                    multiline={true}
                    numberOfLines={10}
                    autoCapitalize={'sentences'}
                />
                {ingredients.map(renderIngredient)}
                <Button mode={'text'} onPress={openAddIngredientModal}>
                    ADD INGREDIENT
                </Button>
            </Surface>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        padding: 16,
        borderRadius: 16,
    },
});

export default RecipeEditorScreen;
