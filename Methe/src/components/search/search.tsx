// Import necessary components and styles from React Native and external libraries
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { TouchableOpacity, View, Text, ScrollView, LayoutAnimation } from "react-native";
import tw from "@/lib/tailwind";
import { Entypo } from "@expo/vector-icons";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import CocktailService from "@/src/utils/services/cocktailService";
import { StringUtils } from "@/src/utils/utils";
import ListingOptions from "@/src/components/listingOptions";
import { SearchBar, SearchItem } from "@/src/components/search/utils";
import {ApiCocktailResponse, getDetailsFromCocktail, getIngredientListData} from "@/src/utils/cocktail";
import ModalComponent from "@/src/components/modal";
import { CocktailAPI, IngredientAPI } from "@/src/utils/interface/CocktailAPIInterface";
import {CocktailDetail} from "@/src/utils/interface/CocktailInterface";

// Interface for the props of the SearchModal component
interface SearchModalProps {
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>,
    setSearchResult: Dispatch<SetStateAction<CocktailDetail[]>>,
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    searchByIngredient: boolean,
    setSearchByIngredient: Dispatch<SetStateAction<boolean>>,
}

// Main component for the search modal
export default function SearchModal({ searchValue, setSearchValue, setSearchResult, visible, setVisible, searchByIngredient, setSearchByIngredient } : SearchModalProps) {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    // State for saving the local searched value
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);

    const [ingredients, setIngredients] = useState<string[]>();

    // Clear inputs
    const onCancel = () => {
        setLocalSearchValue('');
        setSearchValue('');
    }

    // Clear inputs and reset search mode
    const onClear = () => {
        setSearchByIngredient(false);
        onCancel();
    }

    // Function to call the cocktail search API
    const callSearch = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();

        // Nothing to do with empty input
        if(!StringUtils.isNullOrWhitespace(localSearchValue))
        {
            const trimValue = localSearchValue.trim();
            // Just one character => get list of all cocktails by first letter
            if(trimValue.length == 1)
            {
                try {
                    return await cocktailService.getCocktailByFirstLetter(trimValue);
                } catch (err) {
                    console.error(err);
                }
            }
            else if(searchByIngredient)
            {
                try {
                    return await cocktailService.getCocktailByIngredientName(trimValue);
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    return await cocktailService.getCocktailByName(trimValue);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    // Function to fetch search results and update state
    const fetchSearch = () => {
        callSearch().then((result: ApiCocktailResponse) => {
            const cocktailDetails: CocktailDetail[] = [];

            if(result && result.drinks){
                result.drinks.map( (cocktail: CocktailAPI) => {
                    const cocktailDetail = getDetailsFromCocktail(cocktail);
                    cocktailDetail && cocktailDetails.push(cocktailDetail);
                })
            }

            setSearchResult(cocktailDetails);
        });
    }

    // Executes the search and closes the modal
    const onExecuteSearch = () => {
        fetchSearch();
        setSearchValue(localSearchValue);
        setVisible(false);
    }

    const toggleSearchByIngredient = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSearchByIngredient(!searchByIngredient);
    };

    useEffect(() => {
        if(!ingredients){
            getIngredientListData().then(( result ) => {
                const resultList: string[] = [];
                if(result && result.drinks){
                    result.drinks.map(( ingredient: IngredientAPI ) => {
                        resultList.push(ingredient.strIngredient1);
                    });
                }

                setIngredients(resultList.sort());
            });
        }
    }, []);

    return (
        <ModalComponent title={i18n.t('search.title')} visible={visible} setVisible={setVisible}>
            {/* Search mode */}
            <View style={tw`flex-1 px-5 gap-5`}>

                <SearchItem
                    isActive={searchByIngredient}
                    title={i18n.t('search.byNameTitle')}
                    onPress={toggleSearchByIngredient}
                >
                    <SearchBar searchedValue={localSearchValue} setSearchedValue={setLocalSearchValue} onCancel={onCancel}/>
                </SearchItem>

                <SearchItem
                    isActive={!searchByIngredient}
                    title={i18n.t('search.byIngredientTitle')}
                    onPress={toggleSearchByIngredient}
                    style={tw`flex-initial`}
                >
                    { ingredients && <ScrollView showsVerticalScrollIndicator={false}>
                        <ListingOptions list={ingredients} current={localSearchValue} change={setLocalSearchValue}/>
                    </ScrollView>}
                </SearchItem>

            </View>

            {/* Footer */}
            <View style={tw`p-5 flex-row justify-between items-center`}>
                <TouchableOpacity onPress={onClear}>
                    <Text style={tw`underline text-lg text-black dark:text-white`}>
                        {i18n.t('search.buttonClear')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onExecuteSearch} style={tw`p-2 flex-row gap-2 rounded-md bg-darkGrayBrown dark:bg-palePeach`}>
                    <Entypo name="magnifying-glass" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                    <Text style={tw`text-lg text-palePeach dark:text-darkGrayBrown`}>
                        {i18n.t('search.buttonSearch')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ModalComponent>
    );
}

