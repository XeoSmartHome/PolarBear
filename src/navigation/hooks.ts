import { StackNavigationOptions } from "@react-navigation/stack";
import { DependencyList, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";


export const useScreenHeader = (options: StackNavigationOptions, deps: DependencyList | undefined = []) => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions(options);
    }, [navigation, ...deps]);
};
