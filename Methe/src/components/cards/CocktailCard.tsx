import tw from '@/lib/tailwind';

import React from "react";
import { Text, Image, TouchableOpacity, View} from 'react-native';

import { router } from "expo-router";
import { CocktailFavoriteStatus } from "@/src/components/utils/utils";
import {useFavoritesContext} from "@/src/contexts/favorites";

/**
 * The porps of the CocktailCards
 */
interface CocktailCardProps {
    cocktailId: string;
    cocktailName: string;
    cocktailImage: string;
}

export default function CocktailCard({ cocktailId, cocktailName, cocktailImage }: CocktailCardProps) {

    const {
        isFavorite,
        toggleFavorite
    } = useFavoritesContext()

    /**
     * Navigate to the specific cocktail
     */
    const openCocktailDetail = () => {
        router.push({pathname: '/cocktailDetail', params: { cocktailId: cocktailId }});
    }

    return (
        <TouchableOpacity onPress={openCocktailDetail} style={tw `h-60 w-60 rounded-3xl`}>
            <View style={tw `bg-white rounded-3xl shadow-lg`}>
                <Image  style={tw `h-60 w-60 rounded-t-3xl`} source={{ uri: cocktailImage }} />

                {/* Like Cocktail */}
                <CocktailFavoriteStatus
                    isFavorite={isFavorite(cocktailId)}
                    toggleFavorite={ () => toggleFavorite(cocktailId)}
                />

                <View style={tw `px-3 pb-4`} >
                    <Text style={tw `text-lg font-bold pt-2`}>{cocktailName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
