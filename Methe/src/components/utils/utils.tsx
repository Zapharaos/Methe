import tw from '../../../lib/tailwind';

import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

/**
 * The porps of the LikeCocktail
 */
interface CocktailFavoriteStatusProps {
    isFavorite: boolean;
    toggleFavorite: () => Promise<void>;
}

/**
 * The component to print a heart and set up a click event
 * @param isFavorite a useState representing if the cocktail is liked
 * @param toggleFavorite a function to modify the like list
 */
export function CocktailFavoriteStatus ({ isFavorite, toggleFavorite }: CocktailFavoriteStatusProps) {

    return (
        <TouchableOpacity onPress={toggleFavorite} style={tw `absolute top-0 right-0 m-1 mr-3 p-2 w-10 h-10 bg-white rounded-full items-center justify-center`}>
            {!isFavorite && <MaterialIcons name="favorite-outline" size={24} color="black" />}
            {isFavorite && <MaterialIcons name="favorite" size={24} color="black" />}
        </TouchableOpacity>
    );
}
