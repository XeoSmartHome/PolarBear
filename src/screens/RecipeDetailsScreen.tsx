import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RouteNavigationParams } from 'navigation/types';
import { SCREENS } from 'navigation/SCREENS';
import { Button, IconButton, List, Surface, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useScreenHeader } from 'navigation/hooks';
import { MeasuredIngredient } from 'types';
import BluetoothManager from '../bluetooth/BluetoothManager';
import { jumpTo } from 'store/BottomTabNavigator/slice';
import { useDispatch } from 'react-redux';

interface RecipeIngredientProps {
    ingredient: MeasuredIngredient;
    navigation: StackNavigationProp<RouteNavigationParams>;
}

const RecipeIngredient = ({
    ingredient,
    navigation,
}: RecipeIngredientProps) => {
    const goToIngredientDetails = useCallback(() => {
        navigation.navigate(SCREENS.INGREDIENT_DETAILS, { ingredient });
    }, [ingredient, navigation]);

    return (
        <List.Item
            key={ingredient.id}
            title={`${ingredient.label} - ${ingredient.quantity}ml`}
            titleNumberOfLines={1}
            titleEllipsizeMode={'middle'}
            // description={ingredient.quantity}
            left={props => <List.Icon icon={'bottle-tonic'} {...props} />}
            onPress={goToIngredientDetails}
        />
    );
};

interface RecipeDetailsScreenProps {
    navigation: StackNavigationProp<
        RouteNavigationParams,
        SCREENS.RECIPE_DETAILS
    >;
    route: RouteProp<RouteNavigationParams, SCREENS.RECIPE_DETAILS>;
}

const RecipeDetailsScreen = ({
    route: {
        params: { recipe },
    },
    navigation,
}: RecipeDetailsScreenProps) => {
    const [favorite, setFavorite] = useState(false);

    const addOrRemoveFromFavorites = useCallback(() => {
        setFavorite(val => !val);
    }, []);

    useScreenHeader(
        {
            headerTitle: recipe.name,
            headerRight: props => (
                <IconButton
                    icon={favorite ? 'star' : 'star-outline'}
                    // color={favorite ? 'yellow' : props.tintColor}
                    onPress={addOrRemoveFromFavorites}
                />
            ),
        },
        [recipe, addOrRemoveFromFavorites, favorite],
    );

    const dispatch = useDispatch();

    const startRecipe = useCallback(() => {
        BluetoothManager.startRecipe(recipe);
        dispatch(jumpTo(2));
    }, [recipe]);

    const renderIngredient = useCallback(
        (ingredient: MeasuredIngredient) => {
            return (
                <RecipeIngredient
                    key={ingredient.id}
                    ingredient={ingredient}
                    navigation={navigation}
                />
            );
        },
        [navigation],
    );

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Surface style={{ borderRadius: 20, padding: 12 }}>
                <MaterialCommunityIcons
                    name={'glass-cocktail'}
                    size={200}
                    style={styles.icon}
                    color={'white'}
                />
                <Text numberOfLines={3}>{`${'\t'}` + recipe.description}</Text>
                <View style={styles.ingredients}>
                    {recipe.ingredients.map(renderIngredient)}
                </View>
                <Button
                    mode={'contained'}
                    style={styles.button}
                    onPress={startRecipe}>
                    Start recipe
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
    icon: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    ingredients: {
        marginTop: 16,
    },
    button: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
    },
});

export default RecipeDetailsScreen;
