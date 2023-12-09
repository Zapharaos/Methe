import {useEffect, useState} from "react";

import {useFavoritesContext} from "@/src/contexts/favorites";

import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import {getCocktailInfoById} from "@/src/utils/cocktail";
import CocktailsFlatlist from "@/src/components/cards/CocktailsFlatlist";
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
        <CocktailsFlatlist cocktails={cocktails}/>
    )
}