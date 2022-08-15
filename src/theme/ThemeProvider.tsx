import React, { ReactNode } from "react";
import { MD3DarkTheme as PaperDefaultTheme, Provider } from "react-native-paper";
import { DarkTheme as NavigationDefaultTheme } from "@react-navigation/native";
import merge from "deepmerge";

export const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <Provider theme={CombinedDefaultTheme}>
            {children}
        </Provider>
    );
};

export default ThemeProvider;
