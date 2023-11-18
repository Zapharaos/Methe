import tw from '../../../lib/tailwind';

import React, {useState} from "react";
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import CocktailCards from "@/src/components/cards/CocktailCards";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";

interface ContainerCardsProps {
    addIntoLikedList: (cocktailId: bigint) => void;
    cocktailList: Cocktail[];
    likedList: bigint[];
}

export default function ContainerCards({ addIntoLikedList, cocktailList, likedList }: ContainerCardsProps) {

    const {width, height} = Dimensions.get('window');

    /**
     * Navigate to the specific cocktail
     */
    const openCocktailDetail = () => {
        //navigation.navigate('CocktailPage', {cocktailId: cocktailId })
    }

    return (
        <View style={tw `overflow-visible flex justify-center flex-1`}>
            <View>
                {/*<Carousel
                    data={cocktailList}
                    renderItem={({item}) => <CocktailCards
                        addIntoLikedList={addIntoLikedList}
                        cocktailId={item.cocktailId}
                        cocktailNames={item.cocktailNames}
                        cocktailImage={item.cocktailImage}
                        isCocktailLiked={likedList.some((cocktailId: bigint) => cocktailId === item.cocktailId)} />}
                    loop={true}
                    //inactiveSlideScale={0.75}
                    //inactiveSlideOpacity={0.75}
                    width={width}
                    style={{display: 'flex', alignItems: 'center'}}
                />
                <Carousel<{ color: string }>
                    width={width}
                    data={[{ color: 'red' }, { color: 'purple' }, { color: 'yellow' }]}
                    renderItem={({ item }) => {
                        return <View style={{ backgroundColor: item.color, flex: 1 }} />;
                    }}
                />;*/}
            </View>
        </View>
    );
}
