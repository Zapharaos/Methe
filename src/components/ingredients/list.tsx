// Import necessary React and React Native components and styles
// Import necessary React and React Native components and styles
import React from 'react';
import { View } from 'react-native';
import tw from '@/lib/tailwind';

// Import the Ingredient type and IngredientListItem component
import { Ingredient } from "@/src/utils/interface/CocktailInterface";
import IngredientListItem from "@/src/components/ingredients/listItem";

// Defining the props interface for the IngredientsList component
interface IngredientsListProps {
    ingredients: Ingredient[]; // Array of ingredients to be displayed in the list
    units: number;             // Number of units for the ingredients
}

// Defining the IngredientsList component
const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients, units}) => {
    return (
        // Container for the grid of ingredients
        <View style={tw`mt-5`}>
            {ingredients.map((ingredient, index) => (
                <IngredientListItem key={index} ingredient={ingredient} units={units}/>
            ))}
        </View>
    )
}

export default IngredientsList;
