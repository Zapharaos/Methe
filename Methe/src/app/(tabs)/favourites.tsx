import {Text} from "react-native";

import BaseComponent from "@/src/components/base";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {useEffect, useState} from "react";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import {INDEX_RANDOM_COCKTAILS} from "@/src/constants/config";
import {getCocktailInfoById, getRandomCocktailObject} from "@/src/utils/cocktail";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import {ScrollView} from "react-native-gesture-handler";

export default function FavouritesTab() {

    const {favorites} = useFavoritesContext();
    const [cocktails, setCocktails] = useState<Cocktail[]>([])

    useEffect(() => {
        const tempCocktails :Cocktail[] = [];
        const fetchCocktails = async () => {
            for (const id of favorites) {
                try {
                    const cocktail = await getCocktailInfoById(id);
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
    )
}