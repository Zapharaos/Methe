import {Text} from "react-native";

import BaseComponent from "@/src/components/base";
import {getRandomCocktailObject} from "@/src/utils/cocktail";
import {useEffect, useState} from "react";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailDetailScreen from "@/src/app/listing/[id]";

export default function RandomTab() {

    const [cocktail, setCocktail] = useState<Cocktail>();

    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktail = await getRandomCocktailObject();
            setCocktail(cocktail);
        };
        fetchCocktail();
    }, []);

    return (
        <BaseComponent>
            {cocktail ? (
                <CocktailDetailScreen cocktailId={cocktail.cocktailId ?? ''} />
            ) : (
                <Text>Loading...</Text>
            )}
        </BaseComponent>
    );
}