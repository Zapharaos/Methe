import {useEffect, useState} from "react";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import BaseComponent from "@/src/components/base";
import {INDEX_RANDOM_COCKTAILS} from "@/src/constants/config";
import {ScrollView} from "react-native-gesture-handler";

export default function HomeTab() {
    const [cocktails, setCocktails] = useState<Cocktail[]>([])

    useEffect(() => {
        const tempCocktails :Cocktail[] = [];
        const fetchCocktails = async () => {
            for (let i = 0; i < INDEX_RANDOM_COCKTAILS; i++) {
                try {
                    const cocktail = await getRandomCocktailObject();
                    tempCocktails.push(cocktail);
                } catch (error) {
                    console.error(error);
                }
            }
            setCocktails(tempCocktails);
        };
        fetchCocktails();
    }, []);

    return (
        <BaseComponent>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CocktailsContainerCards cocktails={cocktails}/>
            </ScrollView>
        </BaseComponent>
    );
}
