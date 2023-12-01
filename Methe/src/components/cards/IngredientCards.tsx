import tw from '../../../lib/tailwind';

import React from "react";
import { Text, Image, View } from 'react-native';

/**
 * The porps of the IngredientCards
 */
interface IngredientCardsProps {
    ingredientName: string;
    ingredientImage: string;
    ingredientMeasure: string;
}

export default function IngredientCards({ ingredientName, ingredientImage, ingredientMeasure }: IngredientCardsProps) {

    return (
        <View style={tw `bg-white rounded-3xl shadow-lg`}>
            <Image  style={tw `h-40 w-40 rounded-t-3xl`} source={{ uri: ingredientImage }} />
            <View style={tw `px-3 pb-4`} >
                <Text style={tw `text-lg font-bold pt-2`}>{ingredientName}</Text>
                <Text style={tw `text-lg font-bold pt-2`}>{ingredientMeasure}</Text>
            </View>
        </View>
    );
}
