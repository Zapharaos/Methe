// Import necessary components and styles from React Native and external libraries
import React, { Dispatch, SetStateAction, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { lastValueFrom } from "rxjs";
import { take } from "rxjs/operators";
import tw from "@/lib/tailwind";
import { Entypo } from "@expo/vector-icons";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import { Cocktail, FilterCocktail } from "@/src/utils/interface/CocktailInterface";
import CocktailService from "@/src/utils/services/cocktailService";
import { StringUtils } from "@/src/utils/utils";
import ListingOptions from "@/src/components/listingOptions";
import { SearchBar, SearchClickableItem, SearchItem, SearchItemTitle } from "@/src/components/search/utils";
import { ApiCocktailResponse } from "@/src/utils/cocktail";
import ModalComponent from "@/src/components/modal";

// List of example ingredients for searching by ingredient
const ingredients = [
    "Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps",
    "Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps",
    "Light rum", "Applejack", "Gin", "Dark rum", "Sweet Vermouth", "Strawberry schnapps"
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
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

// Main component for the search modal
export default function SearchModal({ searchValue, setSearchValue, setSearchResult, visible, setVisible } : SearchModalProps) {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    // State for saving the local searched value
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);

    // State for toggling between search by name and search by ingredient
    const [searchByIngredient, setSearchByIngredient] = useState<boolean>(false);

    // Toggle between search modes and clear search input
    const toggleSearchByIngredient = () => {
        setLocalSearchValue('');
        setSearchByIngredient(!searchByIngredient);
    }

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
                    return await lastValueFrom(cocktailService.getCocktailByFirstLetter(trimValue).pipe(take(1)));
                } catch (err) {
                    console.error(err);
                }
            }
            else if(searchByIngredient)
            {
                try {
                    return await lastValueFrom(cocktailService.getCocktailByIngredientName(trimValue).pipe(take(1)));
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    return await lastValueFrom(cocktailService.getCocktailByName(trimValue).pipe(take(1)));
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
                const tempResult: Cocktail[] = [];
                result.drinks.map((cocktail: CocktailAPI) => {
                    const newCocktail: Cocktail = {
                        cocktailId: cocktail.idDrink,
                        cocktailName: cocktail.strDrink,
                        cocktailImage: cocktail.strDrinkThumb,
                    };
                    tempResult.push(newCocktail);
                });
                setSearchResult(tempResult);
            }
            else
            {
                console.log('Erreur : aucun retour API')
            }
        });
    }

    // Executes the search and closes the modal
    const onExecuteSearch = () => {
        fetchSearch();
        setSearchValue(localSearchValue);
        setVisible(false);
    }

    return (
        <ModalComponent title={i18n.t('search.title')} visible={visible} setVisible={setVisible}>
            {/* Search mode */}
            {searchByIngredient ? (
                <View style={tw`flex-1 mx-5 gap-5`}>
                    {/* Item to toggle the search by name */}
                    <SearchClickableItem label={i18n.t('search.byNameTitle')} onPress={toggleSearchByIngredient} />
                    {/* Item that allows to execute the search by ingredient */}
                    <SearchItem style={tw`flex-1`} isVisible={searchByIngredient}>
                        <SearchItemTitle label={i18n.t('search.byIngredientTitle')} />
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ListingOptions list={ingredients} current={localSearchValue} change={setLocalSearchValue}/>
                        </ScrollView>
                    </SearchItem>
                </View>
            ) : (
                <View style={tw`flex-1 mx-5 gap-5`}>
                    {/* Item that allows to execute the search by name */}
                    <SearchItem isVisible={searchByIngredient}>
                        <SearchItemTitle label={i18n.t('search.byNameTitle')} />
                        <SearchBar searchedValue={localSearchValue} setSearchedValue={setLocalSearchValue} onCancel={onCancel}/>
                    </SearchItem>
                    {/* Item to toggle the search by ingredient */}
                    <SearchClickableItem label={i18n.t('search.byIngredientTitle')} onPress={toggleSearchByIngredient}/>
                </View>
            )}
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

