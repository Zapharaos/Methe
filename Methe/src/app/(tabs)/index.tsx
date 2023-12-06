import {useEffect, useState} from "react";
import {lastValueFrom} from "rxjs";
import {take} from "rxjs/operators";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

import CocktailService from "@/src/utils/services/cocktailService";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import BaseComponent from "@/src/components/base";

/**
 * Return type of the Api call
 */
interface ApiCocktailResponse  {
    drinks: []
}
export default function HomeTab() {
    const { i18n} = usePreferencesContext();

    const [cocktailList, setCocktailList] = useState<Cocktail[]>([])

    /**
     *  Use the Cocktail service to call the API
     */
    const getRandomCocktailData = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();
        try {
            return await lastValueFrom(cocktailService.getRandomCocktail().pipe(take(1)));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getRandomCocktailData().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailName: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
        getRandomCocktailData().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailName: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
        getRandomCocktailData().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailName: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
    }, []);

    return (
        <BaseComponent>
            <CocktailsContainerCards cocktailList={cocktailList}/>
        </BaseComponent>
    );
}
