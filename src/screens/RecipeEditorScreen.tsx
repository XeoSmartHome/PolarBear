import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useScreenHeader } from 'navigation/hooks';
import { RouteProp } from '@react-navigation/native';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import XTextInput from 'components/Common/XTextInput';
import { useForm } from 'react-hook-form';
import { Button, Divider, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { customRecipesActions } from 'store/CustomRecipes/slice';
import { MeasuredIngredient } from 'types';
import RecipeIngredientsListItem from 'components/Recipe/RecipeIngredientsListItem';
import { StackNavigationProp } from '@react-navigation/stack';
import XCard from 'components/Common/XCard';
import { selectCustomRecipeById } from 'store/CustomRecipes/selectors';

type RecipeEditorScreenProps = {
    navigation: StackNavigationProp<
        RouteNavigationParams,
        SCREENS.RECIPE_EDITOR
    >;
    route: RouteProp<RouteNavigationParams, SCREENS.RECIPE_EDITOR>;
};

enum RECIPE_FIELDS {
    NAME = 'name',
    DESCRIPTION = 'description',
}

const RecipeEditorScreen = ({
    route: { params },
    navigation,
}: RecipeEditorScreenProps) => {
    const dispatch = useDispatch();
    const recipe = useSelector(selectCustomRecipeById(params?.recipeId));
    const [ingredients, setIngredients] = useState<MeasuredIngredient[]>(
        params.scope === 'new' ? [] : recipe?.ingredients || [],
    );

    const { control, handleSubmit, getValues, setFocus } = useForm({
        defaultValues: {
            [RECIPE_FIELDS.NAME]: params.scope === 'edit' && recipe ? recipe.name : '',
            [RECIPE_FIELDS.DESCRIPTION]:
                params.scope === 'edit' && recipe ? recipe.description : '',
        },
    });

    const openAddIngredientModal = useCallback(() => {}, []);

    const createOrUpdateRecipe = useCallback(() => {
        const { name, description } = getValues();
        if (params.scope === 'edit' && recipe !== undefined) {
            dispatch(
                customRecipesActions.updateRecipe({
                    ...recipe,
                    name,
                    description,
                    ingredients,
                }),
            );
            navigation.goBack();
        }
    }, [ingredients]);

    useScreenHeader({
        title: params.scope === 'new' ? 'New recipe' : recipe?.name,
        headerRight: props => (
            <Button mode={'text'} onPress={handleSubmit(createOrUpdateRecipe)}>
                SAVE
            </Button>
        ),
        headerRightContainerStyle: {
            paddingRight: 8,
        },
    });

    const goToIngredientEditorScreen = useCallback(
        (ingredient: MeasuredIngredient) => {
            navigation.navigate(SCREENS.INGREDIENT_EDITOR, { ingredient });
        },
        [],
    );

    const renderIngredient = useCallback(
        (ingredient: MeasuredIngredient) => {
            return (
                <>
                    <RecipeIngredientsListItem
                        ingredient={ingredient}
                        key={`ingredient-${ingredient.id}`}
                        onEditPress={goToIngredientEditorScreen}
                    />
                    <Divider />
                </>
            );
        },
        [goToIngredientEditorScreen],
    );

    const focusDescription = useCallback(() => {
        setFocus(RECIPE_FIELDS.DESCRIPTION);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'handled'}>
            <XCard>
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
                <Divider />
                {ingredients.map(renderIngredient)}
                <Button
                    mode={'text'}
                    onPress={openAddIngredientModal}
                    style={styles.addIngredientButton}>
                    ADD INGREDIENT
                </Button>
            </XCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    addIngredientButton: {
        marginTop: 16,
    },
});

export default RecipeEditorScreen;
