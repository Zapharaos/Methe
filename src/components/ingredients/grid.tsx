// Import necessary React and React Native components and styles
import React from 'react';
import { View } from 'react-native';
import tw from '@/lib/tailwind';

// Import the Ingredient type and IngredientGridItem component
import { Ingredient } from "@/src/utils/interface/CocktailInterface";
import IngredientGridItem from "@/src/components/ingredients/gridItem";

// Defining the props interface for the IngredientsGrid component
interface IngredientsGridProps {
    ingredients: Ingredient[]; // Array of ingredients to be displayed in the grid
    units: number;             // Number of units for the ingredients
}

// Defining the IngredientsGrid component
const IngredientsGrid: React.FC<IngredientsGridProps> = ({ ingredients, units}) => {
    return (
        // TODO : replacing with FlatList ?
        // Container for the grid of ingredients
        <View style={tw`mt-5 flex-row flex-wrap justify-around items-stretch`}>
            {ingredients.map((ingredient, index) => (
                <IngredientGridItem key={index} ingredient={ingredient} units={units} />
            ))}
        </View>
    )
}

export default IngredientsGrid;
