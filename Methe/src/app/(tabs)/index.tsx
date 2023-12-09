import React, {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import tw from "@/lib/tailwind";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import {
    RANDOM_COCKTAILS_LIMIT, RANDOM_COCKTAILS_LOAD, REPLACEMENT_ATTEMPTS
} from "@/src/constants/config";
import Loader from "@/src/components/loader";
import CocktailsFlatlist from "@/src/components/cards/CocktailsFlatlist";

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

    const FlatlistFooter = () => {
        return (
            <View>
                {cocktails.length >= RANDOM_COCKTAILS_LIMIT ? (
                    <View style={tw`flex-1 items-center`}>
                        <Text style={tw`text-base text-midLight dark:text-midDark`}>
                            {i18n.t('limitReached')}
                        </Text>
                        <TouchableOpacity onPress={() => setCocktails([])} style={tw`p-2 m-2 flex-row items-center rounded-lg bg-darkGrayBrown dark:bg-palePeach`}>
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

    return (
        <CocktailsFlatlist cocktails={cocktails} endReached={handleFlatlistEndReached} Footer={FlatlistFooter}/>
    );
}
