import tw from '../../lib/tailwind';

import {useEffect, useState} from "react";
import { Button, Text, View } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { take } from "rxjs/operators";

import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import CocktailCards from "../components/cards/CocktailCards";

import CocktailService from "../utils/services/cocktailService"
import {lastValueFrom} from "rxjs";

interface SplashScreenProps {
    navigation: NavigationProp<any>;
}

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

export default function HomeScreen({ navigation }: SplashScreenProps) {

    const { i18n} = usePreferencesContext();
    const likedList: bigint[] = [];

    // API
    const [randomCocktail, setRandomCocktail] = useState<Cocktail | undefined>();

    const toSett = () => {
        navigation.navigate('Settings')
    }

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
            <Text style={tw`text-black dark:text-white`}>{i18n.t('welcome')}</Text>
            <Button title="Settings" onPress={ () => { navigation.navigate('Settings')} } />
            {randomCocktail && <CocktailCards
                navigation={navigation}
                addIntoLikedList={addIntoLikedList}
                cocktailId={randomCocktail.cocktailId}
                cocktailNames={randomCocktail.cocktailNames}
                cocktailImage={randomCocktail.cocktailImage}
                isCocktailLiked={likedList.some((cocktailId: bigint) => cocktailId === randomCocktail.cocktailId)}
            ></CocktailCards>}
        </BaseComponent>
    );
}
