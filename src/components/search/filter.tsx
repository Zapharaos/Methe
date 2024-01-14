// Import necessary components and styles from React Native and external libraries
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import tw from "@/lib/tailwind";
import { Entypo } from "@expo/vector-icons";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import ModalComponent from "@/src/components/modal";
import { FilterItem } from "@/src/components/search/utils";
import { getCategoriesListData, getIngredientListData, getAlcoholicListData, getGlassListData } from "@/src/utils/cocktail"
import { AlcoholicAPI, CategoriesAPI, GlassAPI, IngredientAPI } from "@/src/utils/interface/CocktailAPIInterface";

// Interface for the props of the SearchModal component
interface FilterModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
    setFilterActive: Dispatch<SetStateAction<boolean>>,
    executeFilter: () => void,
    filterCategory: string[],
    setFilterCategory: Dispatch<SetStateAction<string[]>>,
    filterGlasses: string[],
    setFilterGlasses: Dispatch<SetStateAction<string[]>>,
    filterIngredients: string[],
    setFilterIngredients: Dispatch<SetStateAction<string[]>>,
    filterAlcoholic: string[],
    setFilterAlcoholic: Dispatch<SetStateAction<string[]>>
}

// Main component for the search modal
export default function FilterModal({ visible, setVisible, setFilterActive, executeFilter, filterCategory, setFilterCategory, filterGlasses,
                                        setFilterGlasses, filterIngredients, setFilterIngredients, filterAlcoholic, setFilterAlcoholic } : FilterModalProps) {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    const [categories, setCategories] = useState<string[]>();
    const [glasses, setGlasses] = useState<string[]>();
    const [ingredients, setIngredients] = useState<string[]>();
    const [alcoholic, setAlcoholic] = useState<string[]>();

    // Clear filters and filter mode
    const onClear = () => {
        setFilterCategory([]);
        setFilterGlasses([]);
        setFilterIngredients([]);
        setFilterAlcoholic([]);
        setFilterActive(false);
    }

    const toggleFilter = (list:string[], item:string) => {
        const index = list.indexOf(item);

        if (index !== -1) {
            // If the item is already in the array, remove it
            const newList = [...list];
            newList.splice(index, 1);
            return newList;
        } else {
            // If the item is not in the array, add it
            return [...list, item];
        }
    }

    const toggleCategoryFilter = (category: string) => {
        setFilterCategory(toggleFilter(filterCategory, category));
    }

    const toggleGlassesFilter = (glass: string) => {
        setFilterGlasses(toggleFilter(filterGlasses, glass));
    }

    const toggleIngredientsFilter = (ingredient: string) => {
        setFilterIngredients(toggleFilter(filterIngredients, ingredient));
    }

    const toggleAlcoholicFilter = (alcoholic: string) => {
        setFilterAlcoholic(toggleFilter(filterAlcoholic, alcoholic));
    }

    /**
     * Call the props function to filter printed list
     */
    const onExecuteFilter = () => {
        setVisible(false);
        executeFilter();
    }

    /**
     * One first load, call the API to fill all filter dropdown list
     */
    useEffect(() => {
        if(!categories || !glasses || !ingredients || !alcoholic) {
            getCategoriesListData().then(( result ) => {
                const resultList: string[] = [];
                if(result && result.drinks){
                    result.drinks.map(( category: CategoriesAPI ) => {
                        resultList.push(category.strCategory);
                    });
                }

                setCategories(resultList.sort());
            });

            getGlassListData().then(( result ) => {
                const resultList: string[] = [];
                if(result && result.drinks){
                    result.drinks.map(( glass: GlassAPI ) => {
                        resultList.push(glass.strGlass);
                    });
                }

                setGlasses(resultList.sort());
            });

            getIngredientListData().then(( result ) => {
                const resultList: string[] = [];
                if(result && result.drinks){
                    result.drinks.map(( ingredient: IngredientAPI ) => {
                        resultList.push(ingredient.strIngredient1);
                    });
                }

                setIngredients(resultList.sort());
            });

            getAlcoholicListData().then(( result ) => {
                const resultList: string[] = [];
                if(result && result.drinks){
                    result.drinks.map(( alcoholic: AlcoholicAPI ) => {
                        resultList.push(alcoholic.strAlcoholic);
                    });
                }

                setAlcoholic(resultList);
            });
        }
    }, []);

    return (
        <ModalComponent title={i18n.t('filter.title')} visible={visible} setVisible={setVisible}>
            {/* Filter */}
            <ScrollView style={tw`flex-1 px-5`}>
                {/* Categories */}
                { categories && <FilterItem
                    label={'filter.categories.category'}
                    listingProps={{
                        list: categories,
                        current: filterCategory,
                        change: toggleCategoryFilter
                    }}
                />}
                {/* Glasses */}
                { glasses && <FilterItem
                    label={'filter.categories.glasses'}
                    listingProps={{
                        list: glasses,
                        current: filterGlasses,
                        change: toggleGlassesFilter
                    }}
                />}
                {/* Ingredients */}
                { ingredients && <FilterItem
                    label={'filter.categories.ingredients'}
                    listingProps={{
                        list: ingredients,
                        current: filterIngredients,
                        change: toggleIngredientsFilter
                    }}
                />}
                {/* Alcoholic */}
                { alcoholic && <FilterItem
                    label={'filter.categories.alcoholic'}
                    listingProps={{
                        list: alcoholic,
                        current: filterAlcoholic,
                        change: toggleAlcoholicFilter
                    }}
                />}
            </ScrollView>
            {/* Footer */}
            <View style={tw`p-5 flex-row justify-between items-center`}>
                <TouchableOpacity onPress={onClear}>
                    <Text style={tw`underline text-lg text-black dark:text-white`}>
                        {i18n.t('filter.buttonClear')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onExecuteFilter} style={tw`p-2 flex-row gap-2 rounded-md bg-darkGrayBrown dark:bg-palePeach`}>
                    <Entypo name="magnifying-glass" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                    <Text style={tw`text-lg text-palePeach dark:text-darkGrayBrown`}>
                        {i18n.t('filter.buttonSearch')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ModalComponent>
    );
}

