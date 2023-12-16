// Import React and necessary components and libraries
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Stack } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import tw from "@/lib/tailwind";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import { getRandomCocktailObject } from "@/src/utils/cocktail";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import { RANDOM_COCKTAILS_LIMIT, RANDOM_COCKTAILS_LOAD, REPLACEMENT_ATTEMPTS } from "@/src/constants/config";

// Import custom components
import Loader from "@/src/components/loader";
import BaseComponent from "@/src/components/base";
import Header from "@/src/components/header/header";
import HeaderButton from "@/src/components/header/button";
import CocktailsFlatlist from "@/src/components/cocktail/flatList";
import SearchModal from "@/src/components/search/search";
import {set} from "i18n-js/typings/lodash";
import FilterModal from "@/src/components/search/filter";
import {filter} from "rxjs";

// Import color constants
const Colors = require('@/src/constants/colors');

// Main component function
export default function HomeTab() {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    // State for storing fetched cocktails and loading status
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);

    // State for the search
    const [searchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<Cocktail[]>([]);
    const [searchVisible, setSearchVisible] = useState(false);

    // State for the filter
    const [filterVisible, setFilterVisible] = useState(false);

    // Function to fetch cocktails with replacement logic
    const fetchCocktails = async (tempCocktails: Cocktail[]) => {
        try {
            for (let i = 0; i < RANDOM_COCKTAILS_LOAD; i++) {

                let replacementAttempts = 0;

                // Try replacing up to REPLACEMENT_ATTEMPTS times
                while (replacementAttempts < REPLACEMENT_ATTEMPTS) {
                    const cocktail = await getRandomCocktailObject();

                    // Check if the cocktail is null or already present in tempCocktails
                    if (cocktail === null || tempCocktails.some(item => item.cocktailId === cocktail.cocktailId)) {
                        replacementAttempts++;
                        continue; // keep trying to get a valid cocktail
                    }

                    tempCocktails.push(cocktail);
                    break; // Exit the loop
                }
            }
        } catch (error) {
            console.error(error);
        }
        // Update state with fetched cocktails and set loading to false
        setCocktails(tempCocktails);
        setLoading(false);
    };

    // Function to handle end reached for Flatlist
    const handleFlatlistEndReached = () => {

        // Local limit reached
        if(cocktails.length >= RANDOM_COCKTAILS_LIMIT) {
            return;
        }

        // Fetch more cocktails
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    };

    const refreshRandomCocktails = () => {
        setCocktails([]);
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    }

    // Footer component for Flatlist
    const FlatlistFooter = () => {
        return (
            <View>
                {cocktails.length >= RANDOM_COCKTAILS_LIMIT ? (
                    <View style={tw`flex-1 items-center`}>
                        <Text style={tw`text-base text-midLight dark:text-midDark`}>
                            {i18n.t('limitReached')}
                        </Text>
                        <TouchableOpacity onPress={() => refreshRandomCocktails()} style={tw`p-2 m-2 flex-row items-center rounded-lg bg-darkGrayBrown dark:bg-palePeach`}>
                            <FontAwesome name="refresh" size={16} style={tw`text-palePeach dark:text-darkGrayBrown`}/>
                            <Text style={tw`text-base text-palePeach dark:text-darkGrayBrown`}>
                                {' '}{i18n.t('refresh')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Loader />
                )}
            </View>
        )
    }

    // Extended Header component
    const ExtendedHeader = () => {
        return (
            <Header style={tw`p-3 h-28 bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                <View style={tw`flex-1 flex-row items-center justify-between gap-5`}>
                    <TouchableOpacity onPress={() => setSearchVisible(true)} style={tw`flex-1`}>
                        <View style={[styles.searchBtn, tw`p-2 gap-2.5 max-w-xs flex-row items-center rounded-full shadow-palePeach dark:shadow-darkGrayBrown border-palePeachSecond dark:border-darkGrayBrown bg-palePeach dark:bg-darkGrayBrown`]}>
                            <Ionicons name="search" size={24} style={tw`text-darkGrayBrown dark:text-palePeach`} />
                            {searchActive ? (
                                <Text style={tw`text-darkGrayBrown dark:text-palePeach`}>
                                    {searchValue}
                                </Text>
                                ) : (
                                <View>
                                    <Text style={tw`text-darkGrayBrown dark:text-palePeach`}>
                                        {i18n.t('search.barTitle')}
                                    </Text>
                                    <Text style={tw`text-midGray`}>
                                        {i18n.t('search.barSubTitle')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <HeaderButton onPress={() => setFilterVisible(true)} iconComponent1={<Ionicons/>} iconName1={"options-outline"}
                                  buttonStyle={tw`w-12 h-12 bg-palePeachSecond dark:bg-darkGrayBrownSecond`} iconStyle={tw`text-darkGrayBrown dark:text-palePeach`}/>
                </View>
            </Header>
        )
    }

    // useEffect to fetch cocktails on component mount
    useEffect(() => {
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    }, []);

    // useEffect to detect if the search is active or not
    useEffect(() => {
        if (searchValue && !searchActive) {
            setSearchActive(true);
        } else if (!searchValue && searchActive) {
            setSearchActive(false);
        }
    }, [searchValue]);

    // Check if still loading, show loader
    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <BaseComponent wrapperComponent={View} style={tw`mt-28`}>
            <Stack.Screen
                options={{
                    header: () => <ExtendedHeader/>,
                }}
            />
            {/* Display the cocktails : search results or randoms */}
            {searchActive ? (
                <CocktailsFlatlist
                    cocktails={searchResult}
                    endReached={() => {}}
                />
            ) : (
                <CocktailsFlatlist
                    cocktails={cocktails}
                    endReached={handleFlatlistEndReached}
                    Footer={FlatlistFooter}
                />
            )}
            {/* Search modal */}
            <SearchModal
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setSearchResult={setSearchResult}
                visible={searchVisible}
                setVisible={setSearchVisible}
            />
            {/* Search modal */}
            <FilterModal visible={filterVisible} setVisible={setFilterVisible} />
        </BaseComponent>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    searchBtn: {
        borderWidth: StyleSheet.hairlineWidth,
        elevation: 2,
        shadowColor: Colors.midGray,
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});

