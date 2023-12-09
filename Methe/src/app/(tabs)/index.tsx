import React, {useEffect, useState} from "react";
import {FlatList, I18nManager, Text, TouchableOpacity, View} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import tw from "@/lib/tailwind";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import {
    RANDOM_COCKTAILS_LIMIT, RANDOM_COCKTAILS_LOAD, REPLACEMENT_ATTEMPTS
} from "@/src/constants/config";
import Loader from "@/src/components/loader";
import CocktailCard from "@/src/components/cards/CocktailCard";


export default function HomeTab() {

    const {
        i18n
    } = usePreferencesContext();

    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);

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
        setCocktails(tempCocktails);
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    }, []);

    const handleFlatlistEndReached = () => {

        // Local limit reached
        if(cocktails.length >= RANDOM_COCKTAILS_LIMIT) {
            return;
        }

        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    };

    const resetCocktails = () => {
        setCocktails([]);
    }

    const NoCocktails = () => {
        return (
            <Text style={tw`text-base text-midLight dark:text-midDark`}>
                {i18n.t('noCocktails')}
            </Text>
        )
    }

    const Footer = () => {
        return (
            <View>
                {cocktails.length >= RANDOM_COCKTAILS_LIMIT ? (
                    <View style={tw`flex-1 items-center`}>
                        <Text style={tw`text-base text-midLight dark:text-midDark`}>
                            {i18n.t('limitReached')}
                        </Text>
                        <TouchableOpacity onPress={resetCocktails} style={tw`p-2 m-2 flex-row items-center rounded-lg bg-darkGrayBrown dark:bg-palePeach`}>
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

    if (loading) {
        return (
            <Loader/>
        )
    }

    const columns:number = 2;
    // columns depending on the width

    return (
        <FlatList
            data={cocktails}
            keyExtractor={item => item.cocktailId}
            renderItem={({item}) => <CocktailCard id={item.cocktailId} name={item.cocktailName} image={item.cocktailImage} />}
            ListEmptyComponent={<NoCocktails />}
            ListFooterComponent={<Footer />}
            ListFooterComponentStyle={tw`m-5 flex-1`}
            showsVerticalScrollIndicator={false}
            style={tw`p-3 bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}
            contentContainerStyle={columns > 1 ? undefined : tw`items-center`}
            columnWrapperStyle={columns > 1 ? tw`justify-around` : undefined}
            onEndReached={handleFlatlistEndReached}
            numColumns={columns}
        />
    );
}
