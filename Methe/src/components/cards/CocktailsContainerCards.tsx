import React from "react";
import Carousel from 'react-native-snap-carousel';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import CocktailCard from "@/src/components/cards/CocktailCard";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";

/**
 * The props of the ContainerCards
 */
interface ContainerCardsProps {
    cocktailList: Cocktail[];
}

export default function CocktailsContainerCards({ cocktailList }: ContainerCardsProps) {

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
                <CocktailCard
                    cocktailId={item.cocktailId}
                    cocktailName={item.cocktailName}
                    cocktailImage={item.cocktailImage}
                />
            )}
        />
    );
}
