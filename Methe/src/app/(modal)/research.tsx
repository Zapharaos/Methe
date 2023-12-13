import React, {Dispatch, SetStateAction, useState} from "react";
import {
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    Text,
    Pressable,
    ScrollView,
    ViewStyle
} from "react-native";
import { lastValueFrom } from "rxjs";
import { take } from "rxjs/operators";
import tw from "@/lib/tailwind";
import {Entypo, Feather, MaterialIcons} from "@expo/vector-icons";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import {Cocktail, FilterCocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailService from "@/src/utils/services/cocktailService";
import {StringUtils} from "@/src/utils/utils";
import BaseComponent from "@/src/components/base";
import HeaderButton from "@/src/components/header/button";
import SettingsItemOptions from "@/src/components/settings/itemOptions";
import {ResearchBar, ResearchClickableItem, ResearchItem, ResearchItemTitle} from "@/src/components/research/utils";

const ingredients = [
    {"key": "0", "value": "Light rum"},
    {"key": "1", "value": "Applejack"},
    {"key": "2", "value": "Gin"},
    {"key": "3", "value": "Dark rum"},
    {"key": "4", "value": "Sweet Vermouth"},
    {"key": "5", "value": "Strawberry schnapps"},
    {"key": "6", "value": "Light rum"},
    {"key": "7", "value": "Applejack"},
    {"key": "8", "value": "Gin"},
    {"key": "9", "value": "Dark rum"},
    {"key": "10", "value": "Sweet Vermouth"},
    {"key": "11", "value": "Strawberry schnapps"},
    {"key": "12", "value": "Light rum"},
    {"key": "13", "value": "Applejack"},
    {"key": "14", "value": "Gin"},
    {"key": "15", "value": "Dark rum"},
    {"key": "16", "value": "Sweet Vermouth"},
    {"key": "17", "value": "Strawberry schnapps"},
]

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

interface ResearchModalProps {
    isVisible: boolean,
    onClose: () => void,
    setCocktails: Dispatch<SetStateAction<Cocktail[]>>
}

export default function ResearchModal({ isVisible, onClose, setCocktails } : ResearchModalProps) {

    const {
        i18n
    } = usePreferencesContext();

    const [searchedValue, setSearchedValue] = useState<string>('');
    const [searchByIngredient, setSearchByIngredient] = useState<boolean>(false);

    const toggleSearchByIngredient = () => {
        setSearchedValue('');
        setSearchByIngredient(!searchByIngredient);
    }

    const onClear = () => {
        setSearchedValue('');
        setSearchByIngredient(false);
    }

    const [filterCocktailList, setFilterCocktailList] = useState<Cocktail[]>();
    const [filterList, setFilterList] = useState<FilterCocktail>();

    /**
     * API call to get cocktail with cocktail name or ingredient name
     */
    const callResearch = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();

        // Nothing to do with Empty input
        if(!StringUtils.isNullOrWhitespace(searchedValue))
        {
            // Just one character => get List all cocktails by first letter
            if(searchedValue.trim().length == 1)
            {
                try {
                    return await lastValueFrom(cocktailService.getCocktailByFirstLetter(searchedValue.trim()).pipe(take(1)));
                } catch (err) {
                    console.error(err);
                }
            }
            else
            {
                try {
                    return await lastValueFrom(
                        searchByIngredient ? cocktailService.getCocktailByIngredientName(searchedValue.trim()).pipe(take(1)) :
                            cocktailService.getCocktailByName(searchedValue.trim()).pipe(take(1))
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
    const fetchResearch = () => {
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
        <Modal animationType="slide" visible={isVisible}>
            <BaseComponent>
                <View style={tw`w-full flex-1 flex-col gap-5`}>
                    {/* Header */}
                    <View style={tw`h-10 items-center justify-center`}>
                        <HeaderButton onPress={onClose} iconComponent1={<MaterialIcons/>} iconName1={"close"} buttonStyle={tw`ml-3 mr-auto`}/>
                        <Text style={tw`absolute text-xl text-black dark:text-white`}>
                            {i18n.t('search.title')}
                        </Text>
                    </View>
                    {/* Research mode */}
                    {searchByIngredient ? (
                        <View style={tw`flex-1 mx-5 gap-5`}>
                            <ResearchClickableItem label={i18n.t('search.byNameTitle')} onPress={toggleSearchByIngredient} />
                            <ResearchItem style={tw`flex-1`}>
                                <ResearchItemTitle label={i18n.t('search.byIngredientTitle')} />
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <SettingsItemOptions list={ingredients} current={searchedValue} change={setSearchedValue} />
                                </ScrollView>
                            </ResearchItem>
                        </View>
                    ) : (
                        <View style={tw`flex-1 mx-5 gap-5`}>
                            <ResearchItem>
                                <ResearchItemTitle label={i18n.t('search.byNameTitle')} />

                                <ResearchBar fetchResearch={fetchResearch} searchedValue={searchedValue} setSearchedValue={setSearchedValue}/>

                            </ResearchItem>
                            <ResearchClickableItem label={i18n.t('search.byIngredientTitle')} onPress={toggleSearchByIngredient}/>
                        </View>
                    )}
                    {/* Footer */}
                    <View style={tw`p-5 flex-row justify-between items-center`}>
                        <TouchableOpacity onPress={onClear}>
                            <Text style={tw`underline text-lg text-black dark:text-white`}>
                                Clear all
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={tw`p-2 flex-row gap-2 rounded-md bg-darkGrayBrown dark:bg-palePeach`}>
                            <Entypo name="magnifying-glass" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                            <Text style={tw`text-lg text-palePeach dark:text-darkGrayBrown`}>
                                Rechercher
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BaseComponent>
        </Modal>
    );
}

