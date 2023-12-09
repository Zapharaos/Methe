import BaseComponent from "@/src/components/base";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {useEffect, useState} from "react";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import {getCocktailInfoById} from "@/src/utils/cocktail";
import CocktailsFlatlist from "@/src/components/cards/CocktailsFlatlist";
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
                <CocktailsFlatlist cocktails={cocktails}/>
            </ScrollView>
        </BaseComponent>
    )
}