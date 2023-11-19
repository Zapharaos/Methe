import tw from '../../../lib/tailwind';

import React, {useState} from "react";
import Carousel from 'react-native-snap-carousel';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import CocktailCards from "@/src/components/cards/CocktailCards";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";

interface ContainerCardsProps {
    addIntoLikedList: (cocktailId: bigint) => void;
    cocktailList: Cocktail[];
    likedList: bigint[];
}

export default function ContainerCards({ addIntoLikedList, cocktailList, likedList }: ContainerCardsProps) {

    /**
     * Navigate to the specific cocktail
     */
    const openCocktailDetail = () => {
        //navigation.navigate('CocktailPage', {cocktailId: cocktailId })
    }

    return (
        <Carousel
            firstItem={2}
            sliderWidth={wp(100)}
            itemWidth={wp(100)-200}
            inactiveSlideOpacity={0.75}
            inactiveSlideScale={0.77}
            containerCustomStyle={{overflow: 'visible'}}
            slideStyle={{display: 'flex', alignItems: 'center', height: hp(30)}}

            data={cocktailList}
            renderItem={({ item }) => (
                <CocktailCards
                    addIntoLikedList={addIntoLikedList}
                    cocktailId={item.cocktailId}
                    cocktailNames={item.cocktailNames}
                    cocktailImage={item.cocktailImage}
                    isCocktailLiked={likedList.some((cocktailId: bigint) => cocktailId === item.cocktailId)}
                />
            )}
        />
    );
}
