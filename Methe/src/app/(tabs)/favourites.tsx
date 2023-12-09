import {useEffect, useState} from "react";

import {useFavoritesContext} from "@/src/contexts/favorites";

import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import {getCocktailInfoById} from "@/src/utils/cocktail";
import CocktailsFlatlist from "@/src/components/cards/CocktailsFlatlist";
import Loader from "@/src/components/loader";
import {useNavigation} from "expo-router";
import {useIsFocused} from "@react-navigation/core";

export default function FavouritesTab() {

    const {favorites} = useFavoritesContext();
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    const fetchCocktails = async (tempCocktails: Cocktail[]) => {
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

    useEffect(() => {
        const fetchData = async () => {
            await fetchCocktails([...cocktails]);
        };
        fetchData();
    }, []);


    // Refresh the favorites on tab focus
    useEffect(() => {
        if (isFocused && !loading) {
            const fetchData = async () => {
                await fetchCocktails([]);
            };
            fetchData();
        }
    }, [isFocused]);

    if(loading) {
        return (
            <Loader/>
        )
    }

    return (
        <CocktailsFlatlist cocktails={cocktails}/>
    )
}