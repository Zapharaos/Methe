import tw from '../../../lib/tailwind';

import React, { useEffect, useState } from "react";
import {Image,Text, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useLocalSearchParams, useRouter } from "expo-router";

import { lastValueFrom } from "rxjs";
import { take } from "rxjs/operators";

import { usePreferencesContext } from "../../contexts/preferences/preferences";
import BaseComponent from "../../components/base";

import { CocktailDetail } from "@/src/utils/interface/CocktailInterface";
import CocktailService from "@/src/utils/services/cocktailService";
import { CocktailDbImageSize } from "@/src/utils/enums/Cocktail";

import IngredientsContainerCards from "@/src/components/cards/IngredientsContainerCards";
import {CocktailFavoriteStatus, IncrementDecrementNumber} from "@/src/components/utils/utils";
import {useFavoritesContext} from "@/src/contexts/favorites";

/**
 * ApiCocktailResponse type use for the api call
 */
interface ApiCocktailResponse  {
    drinks: []
}

export default function CocktailDetailScreen() {

    const {
        languages,
        localeKey,
        i18n,
        colorSchemes,
        colorSchemeKey
    } = usePreferencesContext();

    const {
        isFavorite,
        toggleFavorite
    } = useFavoritesContext();

    /**
     * The cocktailId of the cocktail
     */
    const {id} = useLocalSearchParams();

    /**
     * The cocktail to present
     */
    const [cocktail, setCocktail] = useState<CocktailDetail>();

    /**
     * The number of person for the ingredients measures
     */
    const [numberPerson, setNumberPerson] = useState<number>(1);

    /**
     *  Use the Cocktail service to call the API
     */
    const getCocktailData = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();
        try {
            return await lastValueFrom(cocktailService.getCocktailById(id.toString()).pipe(take(1)));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCocktailData().then((result) => {
            const cocktailDetail: CocktailDetail = {
                cocktailId: result.drinks[0].idDrink,
                    cocktailName: result.drinks[0].strDrink,
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
            for(let counter: number = 1; hasOtherIngredient && counter <= size; counter++){

                const ingredient: string = result.drinks[0][`strIngredient${counter}`];
                const measure: string = result.drinks[0][`strMeasure${counter}`];

                if(ingredient){
                    const ingredientMeasure: string[] = measure ? measure.split(' ') : [];

                    cocktailDetail.ingredientList.push({
                        ingredientName: ingredient,
                        ingredientImage: cocktailService.getImageByIngredientName(ingredient,CocktailDbImageSize.Small),
                        ingredientMeasure: ingredientMeasure
                    });
                }
                else {
                    hasOtherIngredient = !hasOtherIngredient;
                }
            }

            setCocktail(cocktailDetail);
        });
    }, []);

    return (
        <BaseComponent>
            { cocktail &&
                <SafeAreaView>
                    <ScrollView
                        horizontal={false}
                        showsVerticalScrollIndicator={false}>
                        <Image
                            source={{ uri: cocktail.cocktailImage }}
                            style={{width: wp(90), height: hp(33), borderBottomLeftRadius: 30,
                                borderBottomRightRadius: 30}}
                        />
                        {/* Cocktail Favorite Status */}
                        <CocktailFavoriteStatus
                            isFavorite={isFavorite(cocktail.cocktailId)}
                            toggleFavorite={() => toggleFavorite(cocktail.cocktailId)}
                        />

                        <View style={ tw `flex-1`}>
                            <View style={ tw `mx-5 mt-2 flex-row justify-between items-center`}>
                                <Text style={ tw `text-white text-3xl font-semibold`}>
                                    {cocktail.cocktailName}
                                </Text>
                            </View>
                            {/* Quick information about the cocktail */}
                            <View style={ tw `mt-3 flex-row justify-between`}>
                                <View
                                    style={ tw `p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                    <Text style={tw `text-white`}> {cocktail.strAlcoholic} </Text>
                                </View>
                                <View
                                    style={ tw `p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                    <Text style={tw `text-white`}> {cocktail.strCategory} </Text>
                                </View>
                                <View
                                    style={ tw `p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                    <Text style={tw `text-white`}> {cocktail.strGlass} </Text>
                                </View>
                            </View>

                            <View style={ tw `mx-5 mt-2`}>
                                <Text style={tw `text-white text-lg font-bold`}>About</Text>
                                <Text style={tw `text-white mt-2`}>
                                    {cocktail.strInstructions}
                                </Text>
                            </View>

                            <View>
                                <View style={ tw `m-5`}>
                                    <Text style={tw `text-white text-lg font-bold`}>Les Ingrédients</Text>

                                    <View style={ tw `ml-5 flex-row justify-between items-center`}>
                                        <View style={ tw `flex-row items-center`}>
                                            <Text style={ tw `text-base text-white font-semibold opacity-60`}>
                                                Le nombre de personne
                                            </Text>
                                        </View>

                                        {/* PlusMoinsNombre */}
                                        <IncrementDecrementNumber
                                            numberPerson={numberPerson}
                                            setNumberPerson={setNumberPerson}/>
                                    </View>
                                </View>
                                <IngredientsContainerCards ingredientList={cocktail.ingredientList} numberPerson={numberPerson}/>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            }
        </BaseComponent>
    );
}

