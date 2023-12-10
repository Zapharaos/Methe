import React, {useEffect, useState} from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Link} from "expo-router";
import {lastValueFrom} from "rxjs";
import {take} from "rxjs/operators";
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import tw from "../../lib/tailwind";

import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";

import CocktailService from "@/src/utils/services/cocktailService";
import {Cocktail, FilterCocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import {StringUtils} from "@/src/utils/utils";

/**
 * Return type of the Api call
 */
interface ApiCocktailResponse  {
    drinks: []
}

interface CocktailAPI {
    idDrink: string,
    strDrink: string,
    strDrinkThumb: string,
}

export default function Index() {
    const { i18n} = usePreferencesContext();
    const likedList: bigint[] = [];

    const [cocktailList, setCocktailList] = useState<Cocktail[]>([]);

    const [filterCocktailList, setFilterCocktailList] = useState<Cocktail[]>();

    const [filterList, setFilterList] = useState<FilterCocktail>();

    /**
     * The text written by the user
     */
    const [textWriteByUser, setTextWriteByUser] = useState<string>('');

    const [searchByIngredient, setSearchByIngredient] = useState<boolean>(false);

    /**
     *  Use the Cocktail service to call the API
     */
    const getRandomCocktailData = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();
        try {
            return await lastValueFrom(cocktailService.getRandomCocktail().pipe(take(1)));
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * API call to get cocktail with cocktail name or ingredient name
     */
    const callResearch = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();

        // Nothing to do with Empty input
        if(!StringUtils.isNullOrWhitespace(textWriteByUser))
        {
            // Just one character => get List all cocktails by first letter
            if(textWriteByUser.trim().length == 1)
            {
                try {
                    return await lastValueFrom(cocktailService.getCocktailByFirstLetter(textWriteByUser.trim()).pipe(take(1)));
                } catch (err) {
                    console.error(err);
                }
            }
            else
            {
                try {
                    return await lastValueFrom(
                        searchByIngredient ? cocktailService.getCocktailByIngredientName(textWriteByUser.trim()).pipe(take(1)) :
                            cocktailService.getCocktailByName(textWriteByUser.trim()).pipe(take(1))
                    );
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    /**
     * Do research with data from textWriteByUser
     */
    const doResearch = () => {
        callResearch().then((result: ApiCocktailResponse) => {
            setCocktailList([]);
            result.drinks.map((cocktail: CocktailAPI) => {
               const newCocktail: Cocktail = {
                   cocktailId: BigInt(cocktail.idDrink),
                   cocktailNames: cocktail.strDrink,
                   cocktailImage: cocktail.strDrinkThumb,
               };
               setCocktailList((prevList: Cocktail[]) => [...prevList, newCocktail]);
           });
        });
    }

    /**
     * Add a cocktail identifier into the cocktail list
     * ToDo : Matthieu il me faut la liste dans la mémoire du téléphone
     */
    const addIntoLikedList = (cocktailId: bigint) => {
        if (!(likedList.some((cocktailId: bigint) => cocktailId === cocktailId))){
            likedList.push(cocktailId);
        }
    }

    useEffect(() => {
        getRandomCocktailData().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailNames: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
        getRandomCocktailData().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailNames: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
        getRandomCocktailData().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailNames: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
    }, []);

    useEffect(() => {

    }, [cocktailList]);

    return (
        <BaseComponent>
            <SafeAreaView>
                { /* ToDo <Link href={'/cocktailDetail'} asChild>
                    <Button title="exemple de lien a delete"/>
                </Link> */}
                {/* search bar */}
                <View style={tw `mx-5 mb-5`}>
                    <View style={tw `flex-row items-center rounded-full p-1 bg-gray-900`}>
                        <TouchableOpacity onPress={doResearch}
                            style={tw `rounded-full p-2 bg-stone-800 ml-1`}>
                            <Entypo name="magnifying-glass" size={24} color="white" />
                        </TouchableOpacity>

                        <TextInput  placeholder='Search'  style={tw `p-4 flex-1 font-semibold text-white`}
                            onChangeText={setTextWriteByUser}
                            value={textWriteByUser}
                            onEndEditing={doResearch}
                        />
                        { textWriteByUser && <TouchableOpacity
                            style={tw `rounded-full p-2 mr-1`}
                            onPress={() => setTextWriteByUser('')}>
                            <MaterialIcons name="cancel" size={24} color="white" />
                        </TouchableOpacity>}
                    </View>
                </View>

                <View style={tw `mx-5 mb-5 flex-row items-center justify-between p-1`}>
                    <TouchableOpacity onPress={() => setSearchByIngredient(prevState => !prevState)}
                        style={tw `rounded-full p-2 ${!searchByIngredient ? 'bg-stone-900' : 'bg-stone-800'} ml-1`}>
                        <Text style={tw `text-white`}> {'Search by Cocktail'} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSearchByIngredient(prevState => !prevState)}
                        style={tw `rounded-full p-2 ${searchByIngredient ? 'bg-stone-900' : 'bg-stone-800'} ml-1`}>
                        <Text style={tw `text-white`}> {'Search by Ingredient'} </Text>
                    </TouchableOpacity>
                </View>

                { cocktailList && <CocktailsContainerCards
                    addIntoLikedList={addIntoLikedList}
                    cocktailList={filterCocktailList ? filterCocktailList : cocktailList}
                    likedList={likedList}
                />}
            </SafeAreaView>
        </BaseComponent>
    );
}
