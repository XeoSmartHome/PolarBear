import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "types";

type RecipesSliceState = {
    recipes: Recipe[]
};

const initialState: RecipesSliceState = {
    recipes: [
        {
            id: "mojito-1",
            name: "Mojito",
            description: "If there is one cocktail to divide opinion, it is surely the omnipresent Mojito cocktail. Some say it is a pain in the arse to make, is too frequently made badly, and is the mascot for unadventurous drinkers everywhere. Others say it is a refreshing and easy drinking cocktail that has introduced millions to the wonders of the mixed drink. Whatever side of the fence you sit on, it’s certainly helped line the pockets of a few mint-growers.",
            ingredients: [
                {
                    id: "white-rum-1",
                    label: "White rum",
                    quantity: 50,
                },
                {
                    id: "sugar-syrup-1",
                    label: "Sugar Syrup",
                    quantity: 12,
                },
                {
                    id: "lime-juice-1",
                    label: "Lime Juice",
                    quantity: 25,
                },
            ],
            tags: [],
        },
        {
            id: "martini-1",
            name: "Martini",
            description: "Some would argue that the Martini Cocktail is the greatest cocktail of them all and certainly the most iconic. The Martini cocktail is quite a simple cocktail in theory, made with just gin & vermouth and garnished either with an olive or a lemon twist.The challenge in making a good Martini is knowing what ratio of gin and vermouth to use and this will often come down to the preference of the drinker. Legend has it that Winston Churchill was said to whisper the word “vermouth” to a freshly poured glass of gin. The Martini can be shaken or stirred although, despite the best efforts of 007, it is general advocated stirring produces the superior cocktail.",
            ingredients: [
                {
                    id: "gin-1",
                    label: "Gin",
                    quantity: 50,
                },
                {
                    id: "dry-vermouth-1",
                    label: "Dry Vermouth",
                    quantity: 10
                },
            ],
            tags: [],
        },
        {
            id: "cosmopolitan-1",
            name: "Cosmopolitan",
            description: "The Cosmopolitan Cocktail is a colourful, fruity concoction made with citron vodka, triple sec, cranberry juice and freshly squeezed lime juice. The drink is often served with a flamed orange twist garnish and served up in a martini glass. The Cosmopolitan has become a mainstay in most cocktail bars and its popularity exploded in the 90`s mainly due to its role in the popular American TV series, Sex and the City.",
            ingredients: [
                {
                    id: "citrus-vodka-1",
                    label: "Citrus Vodka",
                    quantity: 37
                },
                {
                    id: " triple-sec-1",
                    label: " Triple Sec",
                    quantity: 12
                },
                {
                    id: "cranberry-juice-1",
                    label: "Cranberry Juice",
                    quantity: 30
                },
                {
                    id: "sugar-syrup-1",
                    label: "Sugar Syrup",
                    quantity: 12,
                },
            ],
            tags: [],
        },
        {
            id: "mojito-2",
            name: "Mojito L",
            description: "If there is one cocktail to divide opinion, it is surely the omnipresent Mojito cocktail. Some say it is a pain in the arse to make, is too frequently made badly, and is the mascot for unadventurous drinkers everywhere. Others say it is a refreshing and easy drinking cocktail that has introduced millions to the wonders of the mixed drink. Whatever side of the fence you sit on, it’s certainly helped line the pockets of a few mint-growers.",
            ingredients: [
                {
                    id: "white-rum-1",
                    label: "White rum",
                    quantity: 50,
                },
                {
                    id: "sugar-syrup-1",
                    label: "Sugar Syrup",
                    quantity: 12,
                },
                {
                    id: "lime-juice-1",
                    label: "Lime Juice",
                    quantity: 25,
                },
            ],
            tags: [],
        },
        {
            id: "martini-2",
            name: "Martini L",
            description: "Some would argue that the Martini Cocktail is the greatest cocktail of them all and certainly the most iconic. The Martini cocktail is quite a simple cocktail in theory, made with just gin & vermouth and garnished either with an olive or a lemon twist.The challenge in making a good Martini is knowing what ratio of gin and vermouth to use and this will often come down to the preference of the drinker. Legend has it that Winston Churchill was said to whisper the word “vermouth” to a freshly poured glass of gin. The Martini can be shaken or stirred although, despite the best efforts of 007, it is general advocated stirring produces the superior cocktail.",
            ingredients: [
                {
                    id: "gin-1",
                    label: "Gin",
                    quantity: 50,
                },
                {
                    id: "dry-vermouth-1",
                    label: "Dry Vermouth",
                    quantity: 10
                },
            ],
            tags: [],
        },
        {
            id: "cosmopolitan-2",
            name: "Cosmopolitan L",
            description: "The Cosmopolitan Cocktail is a colourful, fruity concoction made with citron vodka, triple sec, cranberry juice and freshly squeezed lime juice. The drink is often served with a flamed orange twist garnish and served up in a martini glass. The Cosmopolitan has become a mainstay in most cocktail bars and its popularity exploded in the 90`s mainly due to its role in the popular American TV series, Sex and the City.",
            ingredients: [
                {
                    id: "citrus-vodka-1",
                    label: "Citrus Vodka",
                    quantity: 37
                },
                {
                    id: " triple-sec-1",
                    label: " Triple Sec",
                    quantity: 12
                },
                {
                    id: "cranberry-juice-1",
                    label: "Cranberry Juice",
                    quantity: 30
                },
                {
                    id: "sugar-syrup-1",
                    label: "Sugar Syrup",
                    quantity: 12,
                },
            ],
            tags: [],
        },
    ],
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {},
});

export const recipesReducer = recipesSlice.reducer;
