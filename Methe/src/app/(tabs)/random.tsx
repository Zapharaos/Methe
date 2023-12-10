import React, {useEffect, useState} from "react";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import {Cocktail} from "@/src/utils/interface/CocktailInterface";
import CocktailComponent from "@/src/components/cocktail";
import Loader from "@/src/components/loader";

export default function RandomTab() {

    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktail:Cocktail = await getRandomCocktailObject();
            setId(cocktail.cocktailId);
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
        <CocktailComponent id={id}/>
    );
}