import React, {useEffect, useState} from "react";
import {Text} from "react-native";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailComponent from "@/src/components/cocktail";
import Loader from "@/src/components/loader";

export default function RandomTab() {

    const [cocktail, setCocktail] = useState<Cocktail>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktail = await getRandomCocktailObject();
            setCocktail(cocktail);
            setLoading(false);
        };
        fetchCocktail();
    }, []);

    if(loading) {
        return (
            <Loader/>
        )
    }

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