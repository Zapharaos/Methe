import {useEffect, useState} from "react";
import {Button} from "react-native";
import {Link} from "expo-router";
import {lastValueFrom} from "rxjs";
import {take} from "rxjs/operators";
import tw from "../../lib/tailwind";

import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";

import CocktailCards from "@/src/components/cards/CocktailCards";
import CocktailService from "@/src/utils/services/cocktailService";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import ContainerCards from "@/src/components/cards/ContainerCards";

/**
 * Return type of the Api call
 */
interface ApiCocktailResponse  {
    drinks: []
}
export default function Index() {
    const { i18n} = usePreferencesContext();
    const likedList: bigint[] = [];
    //const cocktailList: Cocktail[] = [];

    const [cocktailList, setCocktailList] = useState<Cocktail[]>([])

    /**
     *  Use the Cocktail service to call the API
     */
    const getRandomCocktailDate = async (): Promise<ApiCocktailResponse | any> => {
        const cocktailService : CocktailService = new CocktailService();
        try {
            return await lastValueFrom(cocktailService.getRandomCocktails().pipe(take(1)));
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Add a cocktail identifier into the cocktail list
     * ToDo : Matthieu il me faut la liste dans la mémoire du téléphone
     */
    const addIntoLikedList = (cocktailId: bigint) => {
        if (!(likedList.some((cocktailId: bigint) => cocktailId === cocktailId))){
            likedList.push(cocktailId);
        }
    }

    useEffect(() => {
        getRandomCocktailDate().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailNames: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
        getRandomCocktailDate().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailNames: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
        getRandomCocktailDate().then((result) => {
            const newCocktail: Cocktail = {
                cocktailId: result.drinks[0].idDrink,
                cocktailNames: result.drinks[0].strDrink,
                cocktailImage: result.drinks[0].strDrinkThumb,
            };
            setCocktailList((prevList) => [...prevList, newCocktail]);
        });
    }, []);

    return (
        <BaseComponent>
            <Link href={'/cocktailDetail'} asChild>
                <Button title="exemple de lien a delete"/>
            </Link>
            <ContainerCards
                addIntoLikedList={addIntoLikedList}
                cocktailList={cocktailList}
                likedList={likedList}
            />
        </BaseComponent>
    );
}
