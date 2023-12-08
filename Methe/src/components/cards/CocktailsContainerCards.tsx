import React from "react";
import Carousel from 'react-native-snap-carousel';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import CocktailCard from "@/src/components/cards/CocktailCard";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import tw from "@/lib/tailwind";
import {Image, Text, View} from "react-native";
import {getIngredientMeasure} from "@/src/utils/cocktail";

/**
 * The props of the ContainerCards
 */
interface ContainerCardsProps {
    cocktails: Cocktail[];
}

export default function CocktailsContainerCards({ cocktails }: ContainerCardsProps) {

    return (
        <View style={tw`my-5 flex-1 flex-row flex-wrap justify-around`}>
            {cocktails.map((cocktail, index) => (
                <CocktailCard
                    key={index}
                    id={cocktail.cocktailId}
                    name={cocktail.cocktailName}
                    image={cocktail.cocktailImage}
                />
            ))}
        </View>
    );
}
