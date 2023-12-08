import React, {useEffect, useState} from "react";
import {Text} from "react-native";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailComponent from "@/src/components/cocktail";

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
        <>
            {cocktail ? (
                <CocktailComponent id={cocktail.cocktailId}/>
            ) : (
                <Text>Loading...</Text>
            )}
        </>
    );
}