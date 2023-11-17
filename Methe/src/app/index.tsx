import {Button} from "react-native";
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {Link} from "expo-router";
import tw from "../../lib/tailwind";
import CocktailCards from "@/src/components/cards/CocktailCards";
import CocktailService from "@/src/utils/services/cocktailService";
import {lastValueFrom} from "rxjs";
import {take} from "rxjs/operators";
import {useEffect, useState} from "react";

/**
 * Cocktail type use for cards
 */
interface Cocktail {
    cocktailId: bigint;
    cocktailNames: string;
    cocktailImage: string;
}

/**
 * Return type of the Api call
 */
interface ApiCocktailResponse  {
    idDrink: bigint;
    drinks: []
}
export default function Index() {
    const { i18n} = usePreferencesContext();
    const likedList: bigint[] = [];

    // API
    const [randomCocktail, setRandomCocktail] = useState<Cocktail | undefined>();

    /**
     *  Use the Cocktail service to call the API
     */
    const getRandomCocktailDate = async (): Promise<ApiCocktailResponse | unknown> => {
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
        getRandomCocktailDate().then((result: any) => setRandomCocktail({
            cocktailId: result.idDrink,
            cocktailNames: result.drinks[0].strDrink,
            cocktailImage: result.drinks[0].strDrinkThumb
        }));
    }, []);

    return (
        <BaseComponent>
            <Link href={'/settings'} asChild>
                <Button title="exemple de lien a delete"/>
            </Link>
            {randomCocktail && <CocktailCards
                addIntoLikedList={addIntoLikedList}
                cocktailId={randomCocktail.cocktailId}
                cocktailNames={randomCocktail.cocktailNames}
                cocktailImage={randomCocktail.cocktailImage}
                isCocktailLiked={likedList.some((cocktailId: bigint) => cocktailId === randomCocktail.cocktailId)}
            ></CocktailCards>}
        </BaseComponent>
    );
}
