// Import necessary React and React Native components and styles
import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from '@/lib/tailwind';

// Import the getIngredientMeasure function and Ingredient type
import { getIngredientMeasure } from "@/src/utils/cocktail";
import { Ingredient } from "@/src/utils/interface/CocktailInterface";

// Defining the props interface for the IngredientGridItem component
interface IngredientGridItemProps {
    ingredient: Ingredient; // Ingredient object to be displayed
    units: number;          // Number of units for the ingredient
}

// Defining the IngredientGridItem component
const IngredientGridItem: React.FC<IngredientGridItemProps> = ({ ingredient, units }) => {
    return (
        // Container for each ingredient item
        <View style={tw`m-3 py-2 rounded-xl shadow-lg bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
            {/* Ingredient Image */}
            <Image style={tw`h-36 w-36 rounded-3xl`} source={{ uri: ingredient.ingredientImage }} />
            {/* Ingredient Details */}
            <View style={tw`w-36 mt-2 px-2 items-center`}>
                {/* Displaying the ingredient measure */}
                <Text style={tw`font-black text-center text-base text-black dark:text-white`}>
                    {getIngredientMeasure(ingredient.ingredientMeasure, units)}
                </Text>
                {/* Displaying the ingredient name */}
                <Text style={tw`text-center text-base text-black dark:text-white`}>
                    {ingredient.ingredientName}
                </Text>
            </View>
        </View>
    )
}

export default IngredientGridItem;
