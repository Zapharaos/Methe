import {Text} from "react-native";

import BaseComponent from "@/src/components/base";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {useEffect, useState} from "react";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import {INDEX_RANDOM_COCKTAILS} from "@/src/constants/config";
import {getCocktailInfoById, getRandomCocktailObject} from "@/src/utils/cocktail";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import {ScrollView} from "react-native-gesture-handler";
import Loader from "@/src/components/loader";

export default function FavouritesTab() {

    const {favorites} = useFavoritesContext();
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        };
        fetchCocktails();
    }, []);

    if(loading) {
        return (
            <Loader/>
        )
    }

    return (
        <BaseComponent>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CocktailsContainerCards cocktails={cocktails}/>
            </ScrollView>
        </BaseComponent>
    )
}