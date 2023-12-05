import React from "react";
import Carousel from 'react-native-snap-carousel';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import { Ingredient } from "@/src/utils/interface/CocktailInterface";
import IngredientCards from "@/src/components/cards/IngredientCards";

/**
 * The props of the ContainerCards
 */
interface IngredientsContainerCardsProps {
    ingredientList: Ingredient[];
    numberPerson: number;
}

export default function IngredientsContainerCards({ ingredientList, numberPerson }: IngredientsContainerCardsProps) {

    const getIngredientMeasure = (ingredientMeasure : string[]) => {
        let result: string = '';

        try{
            const size: number = ingredientMeasure.length;

            if(size > 1) {
                result = (parseFloat(ingredientMeasure[0]) * numberPerson).toString();
                for (let counter = 1; counter < size; counter++) {
                    result = result.concat(` ${ingredientMeasure[counter]}`)
                }
            }
        }
        catch (ex){
            console.log(`Error : ${ex}`)
        }


        return result;
    }

    return (
        <Carousel
            firstItem={1}
            sliderWidth={wp(80) + 50}
            itemWidth={wp(100) - 250}
            inactiveSlideOpacity={0.75}
            inactiveSlideScale={0.77}
            containerCustomStyle={{overflow: 'visible'}}
            slideStyle={{display: 'flex', alignItems: 'center', height: hp(30)}}

            data={ingredientList}
            renderItem={({ item }) => (
                <IngredientCards
                    ingredientName={item.ingredientName}
                    ingredientImage={item.ingredientImage}
                    ingredientMeasure={getIngredientMeasure(item.ingredientMeasure)}
                />
            )}
        />
    );
}
