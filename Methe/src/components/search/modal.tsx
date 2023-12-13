// Import necessary components and styles from React Native and external libraries
import React, { Dispatch, SetStateAction, useState } from "react";
import { TouchableOpacity, View, Modal, Text, ScrollView } from "react-native";
import { lastValueFrom } from "rxjs";
import { take } from "rxjs/operators";
import tw from "@/lib/tailwind";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import { Cocktail, FilterCocktail } from "@/src/utils/interface/CocktailInterface";
import CocktailService from "@/src/utils/services/cocktailService";
import { StringUtils } from "@/src/utils/utils";
import BaseComponent from "@/src/components/base";
import HeaderButton from "@/src/components/header/button";
import ListingOptions from "@/src/components/listingOptions";
import { SearchBar, SearchClickableItem, SearchItem, SearchItemTitle } from "@/src/components/search/utils";
import { ApiCocktailResponse } from "@/src/utils/cocktail";

// List of example ingredients for searching by ingredient
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

// Interface for API response representing a cocktail
interface CocktailAPI {
    idDrink: string,
    strDrink: string,
    strDrinkThumb: string,
}

// Interface for the props of the SearchModal component
interface SearchModalProps {
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>,
    setSearchResult: Dispatch<SetStateAction<Cocktail[]>>,
    isVisible: boolean,
    onClose: () => void,
}

// Main component for the search modal
export default function SearchModal({ searchValue, setSearchValue, setSearchResult, isVisible, onClose } : SearchModalProps) {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    // State for toggling between search by name and search by ingredient
    const [searchByIngredient, setSearchByIngredient] = useState<boolean>(false);

    // Toggle between search modes and clear search input
    const toggleSearchByIngredient = () => {
        setSearchValue('');
        setSearchByIngredient(!searchByIngredient);
    }

    // Clear search input and reset search mode
    const onClear = () => {
        setSearchValue('');
        setSearchByIngredient(false);
    }

    const [filterCocktailList, setFilterCocktailList] = useState<Cocktail[]>();
    const [filterList, setFilterList] = useState<FilterCocktail>();

    // Function to call the cocktail search API
    const callSearch = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();

        // Nothing to do with empty input
        if(!StringUtils.isNullOrWhitespace(searchValue))
        {
            // Just one character => get list of all cocktails by first letter
            if(searchValue.trim().length == 1)
            {
                try {
                    return await lastValueFrom(cocktailService.getCocktailByFirstLetter(searchValue.trim()).pipe(take(1)));
                } catch (err) {
                    console.error(err);
                }
            }
            else
            {
                try {
                    return await lastValueFrom(
                        searchByIngredient ? cocktailService.getCocktailByIngredientName(searchValue.trim()).pipe(take(1)) :
                            cocktailService.getCocktailByName(searchValue.trim()).pipe(take(1))
                    );
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    // Function to fetch search results and update state
    const fetchSearch = () => {
        callSearch().then((result: ApiCocktailResponse) => {
            if(result && result.drinks){
                setSearchResult([]);
                result.drinks.map((cocktail: CocktailAPI) => {
                    const newCocktail: Cocktail = {
                        cocktailId: cocktail.idDrink,
                        cocktailName: cocktail.strDrink,
                        cocktailImage: cocktail.strDrinkThumb,
                    };
                    setSearchResult((prevList: Cocktail[]) => [...prevList, newCocktail]);
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
                    {/* Search mode */}
                    {searchByIngredient ? (
                        <View style={tw`flex-1 mx-5 gap-5`}>
                            {/* Item to toggle the search by name */}
                            <SearchClickableItem label={i18n.t('search.byNameTitle')} onPress={toggleSearchByIngredient} />
                            {/* Item that allows to execute the search by ingredient */}
                            <SearchItem style={tw`flex-1`}>
                                <SearchItemTitle label={i18n.t('search.byIngredientTitle')} />
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <ListingOptions list={ingredients} current={searchValue} change={setSearchValue} />
                                </ScrollView>
                            </SearchItem>
                        </View>
                    ) : (
                        <View style={tw`flex-1 mx-5 gap-5`}>
                            {/* Item that allows to execute the search by name */}
                            <SearchItem>
                                <SearchItemTitle label={i18n.t('search.byNameTitle')} />
                                <SearchBar fetchSearch={fetchSearch} searchedValue={searchValue} setSearchedValue={setSearchValue}/>
                            </SearchItem>
                            {/* Item to toggle the search by ingredient */}
                            <SearchClickableItem label={i18n.t('search.byIngredientTitle')} onPress={toggleSearchByIngredient}/>
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

