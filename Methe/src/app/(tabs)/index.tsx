import {useEffect, useState} from "react";
import {ScrollView} from "react-native-gesture-handler";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import BaseComponent from "@/src/components/base";
import {
    RANDOM_COCKTAILS_LIMIT, RANDOM_COCKTAILS_LOAD, REPLACEMENT_ATTEMPTS
} from "@/src/constants/config";
import Loader from "@/src/components/loader";

export default function HomeTab() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchCocktails = async (tempCocktails: Cocktail[]) => {
        try {
            for (let i = 0; i < RANDOM_COCKTAILS_LOAD; i++) {

                let replacementAttempts = 0;

                // Try replacing up to maxReplacementAttempts times
                while (replacementAttempts < REPLACEMENT_ATTEMPTS) {
                    const cocktail = await getRandomCocktailObject();

                    // Check if the cocktail is null or already present in tempCocktails
                    if (cocktail === null || tempCocktails.some(item => item.cocktailId === cocktail.cocktailId)) {
                        replacementAttempts++;
                        continue; // keep looping
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
        setLoadingMore(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    }, []);

    const handleEndReached = () => {

        // Local limit reached
        if(cocktails.length >= RANDOM_COCKTAILS_LIMIT) {
            return;
        }

        // Already loading more data
        if(loadingMore){
            return;
        }

        // Executing
        setLoadingMore(true);
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    };

    if(loading) {
        return (
            <Loader/>
        )
    }

    return (
        <BaseComponent>
            <ScrollView showsVerticalScrollIndicator={false} onEnded={handleEndReached}>
                <CocktailsContainerCards cocktails={cocktails}/>
                {loadingMore && <Loader />}
            </ScrollView>
        </BaseComponent>
    );
}
