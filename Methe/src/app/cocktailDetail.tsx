import tw from '../../lib/tailwind';

import React, { useEffect, useState } from "react";
import {Image,Text, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useLocalSearchParams, useRouter } from "expo-router";

import { lastValueFrom } from "rxjs";
import { take } from "rxjs/operators";

import { usePreferencesContext } from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";

import { CocktailDetail } from "@/src/utils/interface/CocktailInterface";
import CocktailService from "@/src/utils/services/cocktailService";
import CocktailDbImageSize from "@/src/utils/enums/CocktailDbImageSize";
import { StatusBar } from "expo-status-bar";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";


interface ApiCocktailResponse  {
    drinks: []
}

export default function CocktailDetailScreen() {

    const router = useRouter();
    const {
        languages,
        localeKey,
        i18n,
        colorSchemes,
        colorSchemeKey
    } = usePreferencesContext();

    const params = useLocalSearchParams();
    const [cocktail, setCocktail] = useState<CocktailDetail>();
    const [size, setSize] = useState<string>('small');

    /**
     * A state to define if this cocktail is liked by the user
     */
    const [isLiked, switchLike] = useState<boolean>(false);

    /**
     *  Use the Cocktail service to call the API
     */
    const getCocktailData = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();
        try {
            return await lastValueFrom(cocktailService.getCocktailById(params.cocktailId.toString()).pipe(take(1)));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCocktailData().then((result) => {
            const cocktailDetail: CocktailDetail = {
                cocktailId: result.drinks[0].idDrink,
                    cocktailNames: result.drinks[0].strDrink,
                    cocktailImage: result.drinks[0].strDrinkThumb,
                    strAlcoholic: result.drinks[0].strAlcoholic,
                    strCategory: result.drinks[0].strCategory,
                    strGlass: result.drinks[0].strGlass,
                    strIBA: result.drinks[0].strIBA,
                    strInstructions: result.drinks[0].strInstructions,
                    ingredientList: [],
                    instructionsByLanguageList: [],
            }

            const cocktailService : CocktailService = new CocktailService();

            let hasOtherIngredient : boolean = true;
            const size : number = CocktailService.maxNumberOfIngredient;
            for(let counter = 1; hasOtherIngredient && counter <= size; counter++){

                const ingredient: string = result.drinks[`strIngredient${counter}`];
                const measure: string = result.drinks[`strMeasure${counter}`];

                if(ingredient){
                    cocktailDetail.ingredientList.push({
                        ingredientName: ingredient,
                        ingredientImage: cocktailService.getImageByIngredientName(ingredient,CocktailDbImageSize.Small),
                        ingredientMeasure: measure ? measure : ''
                    });
                }
                else {
                    hasOtherIngredient = !hasOtherIngredient;
                }
            }

            setCocktail(cocktailDetail);
        });
    }, []);

    /**
     * Add this cocktail in like list and change the icon
     */
    const clickOnLike = () => {
        switchLike(!isLiked);
        //addIntoLikedList(cocktail.cocktailId);
    }

    return (
        <BaseComponent>
            { cocktail &&
                <View style={ tw `flex-1`}>
                    <StatusBar style="light" />
                    <Image
                        source={{ uri: cocktail.cocktailImage }}
                        style={{width: wp(100), height: hp(33), borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30}}
                        />
                    <TouchableOpacity onPress={clickOnLike} style={tw `absolute top-0 right-0 m-1 p-2 w-10 h-10 bg-white rounded-full items-center justify-center`}>
                        {!isLiked && <MaterialIcons name="favorite-outline" size={24} color="black" />}
                        {isLiked && <MaterialIcons name="favorite" size={24} color="black" />}
                    </TouchableOpacity>

                    <SafeAreaView style={ tw `m-5 flex-1`}>
                        <View style={ tw `flex-row justify-between items-center`}>
                            <Text style={ tw `text-white text-3xl font-semibold`}>
                                {cocktail.cocktailNames}
                            </Text>
                        </View>
                        <View style={ tw `mt-2`}>
                            <Text style={ tw `text-white text-lg font-bold`}>Coffee size</Text>
                            <View style={ tw `flex-row justify-between`}>
                                <TouchableOpacity
                                    onPress={()=> setSize('small')}
                                    style={{backgroundColor: size=='small'? '#4D3E3E': 'rgba(0,0,0,0.07)', ...tw `p-3 px-8 rounded-full`}}>
                                    <Text style={{color: size=='small'? "#fff": "#222"}}>Small</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=> setSize('medium')}
                                    style={{backgroundColor: size=='medium'? '#4D3E3E': 'rgba(0,0,0,0.07)', ...tw `p-3 px-8 rounded-full`}}>
                                    <Text style={{color: size=='medium'? "#fff": "#222"}}>Medium</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=> setSize('large')}
                                    style={{backgroundColor: size=='large'? '#4D3E3E': 'rgba(0,0,0,0.07)', ...tw `p-3 px-8 rounded-full`}}>
                                    <Text style={{color: size=='large'? "#fff": "#222"}}>Large</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={ tw `mt-2`}>
                            <Text style={{color: '#fff', ...tw `text-lg font-bold`}}>About</Text>
                            <Text style={ tw `mt-2 text-black`}>
                                {cocktail.strInstructions}
                            </Text>
                        </View>

                    </SafeAreaView>
                    <View style={ tw `m-5`}>
                        <View style={ tw `flex-row justify-between items-center`}>
                            <View style={ tw `flex-row items-center space-x-1`}>
                                <Text style={ tw `text-base text-white font-semibold opacity-60`}>
                                    Le nombre de personne
                                </Text>
                            </View>
                            <View
                                style={tw `flex-row items-center mx-4 border-gray-500 border rounded-full p-1 px-4`}>
                                <TouchableOpacity>
                                    <AntDesign name="minus" size={20} color={'#fff'} />
                                </TouchableOpacity>
                                <Text style={{color: '#fff', ...tw `font-extrabold text-lg mx-1`}}>2</Text>
                                <TouchableOpacity>
                                    <AntDesign name="plus" size={20} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </BaseComponent>
    );
}

