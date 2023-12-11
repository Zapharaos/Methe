import React, {Dispatch, SetStateAction, useState} from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View, Modal, Text, Pressable} from "react-native";
import { lastValueFrom } from "rxjs";
import { take } from "rxjs/operators";
import tw from "@/lib/tailwind";
import {Entypo, MaterialIcons} from "@expo/vector-icons";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import {Cocktail, FilterCocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailService from "@/src/utils/services/cocktailService";
import {StringUtils} from "@/src/utils/utils";
import {set} from "i18n-js/typings/lodash";

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

interface ResearchComponentProps {
    textWriteByUser: string,
    setTextWriteByUser: Dispatch<SetStateAction<string>>,
    doResearch: () => void,
}

function ResearchComponent({ textWriteByUser, setTextWriteByUser, doResearch }: ResearchComponentProps) {
    return (
        <SafeAreaView>
            {/* search bar */}
            <View style={tw `mx-5 mb-5 flex-row items-center rounded-full p-1 bg-gray-900`}>
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
        </SafeAreaView>
    );
}

interface ResearchModalProps {
    isVisible: boolean,
    onClose: () => void,
    setCocktails: Dispatch<SetStateAction<Cocktail[]>>
}

export default function ResearchModal({ isVisible, onClose, setCocktails } : ResearchModalProps) {
    const {
        colorSchemes,
        colorSchemeKey,
        changeColorScheme
    } = usePreferencesContext();

    const [filterCocktailList, setFilterCocktailList] = useState<Cocktail[]>();

    const [filterList, setFilterList] = useState<FilterCocktail>();

    /**
     * The text written by the user
     */
    const [textWriteByUser, setTextWriteByUser] = useState<string>('');

    const [searchByIngredient, setSearchByIngredient] = useState<boolean>(false);


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
            if(result && result.drinks){
                setCocktails([]);
                result.drinks.map((cocktail: CocktailAPI) => {
                    const newCocktail: Cocktail = {
                        cocktailId: cocktail.idDrink,
                        cocktailName: cocktail.strDrink,
                        cocktailImage: cocktail.strDrinkThumb,
                    };
                    setCocktails((prevList: Cocktail[]) => [...prevList, newCocktail]);
                });
            }
            else
            {
                console.log('Erreur : aucun retour API')
            }
        });
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={tw ``}>
                <View style={tw ``}>
                    <Text style={tw ``}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <ResearchComponent
                    textWriteByUser={textWriteByUser}
                    setTextWriteByUser={setTextWriteByUser}
                    doResearch={doResearch} />
            </View>
        </Modal>
    );
}

