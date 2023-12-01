import tw from '../../../lib/tailwind';

import React, {useState} from "react";
import { Text, Image, TouchableOpacity, View} from 'react-native';

import { router } from "expo-router";
import { LikeCocktail } from "@/src/components/utils/utils";

/**
 * The porps of the CocktailCards
 */
interface CocktailCardsProps {
    addIntoLikedList: (cocktailId: bigint) => void;
    cocktailId: bigint;
    cocktailNames: string;
    cocktailImage: string;
    isCocktailLiked: boolean;
}

export default function CocktailCards({ addIntoLikedList, cocktailId, cocktailNames, cocktailImage, isCocktailLiked }: CocktailCardsProps) {

    /**
     * A state to define if this cocktail is liked by the user
     */
    const [isLiked, switchLike] = useState<boolean>(isCocktailLiked);

    /**
     * Navigate to the specific cocktail
     */
    const openCocktailDetail = () => {
        router.push({pathname: '/cocktailDetail', params: { cocktailId: cocktailId.toString() }});
    }

    /**
     * Add this cocktail in like list and change the icon
     */
    const clickOnLike = () => {
        switchLike(!isLiked);
        addIntoLikedList(cocktailId);
    }

    return (
        <TouchableOpacity onPress={openCocktailDetail} style={tw `h-60 w-60 rounded-3xl`}>
            <View style={tw `bg-white rounded-3xl shadow-lg`}>
                <Image  style={tw `h-60 w-60 rounded-t-3xl`} source={{ uri: cocktailImage }} />

                {/* Like Cocktail */}
                <LikeCocktail
                    isLiked={isLiked}
                    clickOnLike={clickOnLike}/>

                <View style={tw `px-3 pb-4`} >
                    <Text style={tw `text-lg font-bold pt-2`}>{cocktailNames}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
