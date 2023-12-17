// Import necessary React and React Native components and styles
import React from 'react';
import { Text, View } from 'react-native';
import tw from '@/lib/tailwind';

// Import the getIngredientMeasure function and Ingredient type
import { getIngredientMeasure } from "@/src/utils/cocktail";
import { Ingredient } from "@/src/utils/interface/CocktailInterface";

// Defining the props interface for the IngredientListItem component
interface IngredientListItemProps {
    ingredient: Ingredient; // Ingredient object to be displayed
    units: number;          // Number of units for the ingredient
}

// Defining the IngredientListItem component
const IngredientListItem: React.FC<IngredientListItemProps> = ({ ingredient, units }) => {
    return (
        // Container for each ingredient item
        <View style={tw`flex-row`}>
            {/* List item dot */}
            <Text style={tw`mr-2 font-black text-justify text-base text-darkGrayBrown dark:text-palePeach`}>
                {`\u2022`}
            </Text>
            {/* Ingredient with quantity and name */}
            <Text style={tw`text-justify text-base text-black dark:text-white`}>
                <Text style={tw`font-black`}>
                    {getIngredientMeasure(ingredient.ingredientMeasure, units)}{' '}
                </Text>
                {ingredient.ingredientName}
            </Text>
        </View>
    )
}

export default IngredientListItem;
