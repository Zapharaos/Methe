import tw from '../../../lib/tailwind';

import React, {useState} from "react";
import { Text, Image, TouchableOpacity, View} from 'react-native';

import {NavigationProp} from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


interface CocktailCardsProps {
    navigation: NavigationProp<any>;
    addIntoLikedList: (cocktailId: bigint) => void;
    cocktailId: bigint;
    cocktailNames: string;
    cocktailImage: string;
    isCocktailLiked: boolean;
}

export default function CocktailCards({ navigation, addIntoLikedList, cocktailId, cocktailNames, cocktailImage, isCocktailLiked }: CocktailCardsProps) {

    //Local state
    const [isLiked, switchLike] = useState<boolean>(isCocktailLiked);

    /**
     * Navigate to the specific cocktail
     */
    const openCocktailDetail = () => {
        navigation.navigate('CocktailPage', {cocktailId: cocktailId })
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
            <View>
                <View style={tw `bg-white rounded-3xl shadow-lg`}>
                    <Image  style={tw `h-60 w-60 rounded-t-3xl`} source={{ uri: cocktailImage }} />
                    <TouchableOpacity onPress={clickOnLike} style={tw `absolute top-0 right-0 m-1 p-2 w-10 h-10 bg-white rounded-full items-center justify-center`}>
                        {!isLiked && <FontAwesomeIcon icon={['far', 'heart']} style={tw `text-black`}/>}
                        {isLiked && <FontAwesomeIcon icon={['fas', 'heart']} style={tw `text-black`}/>}
                    </TouchableOpacity>
                    <View style={tw `px-3 pb-4`} >
                        <Text style={tw `text-lg font-bold pt-2`}>{cocktailNames}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
