import React from "react";
import {useLocalSearchParams} from "expo-router";

import CocktailComponent from "@/src/components/cocktail";

export default function CocktailDetailScreen() {

    const {id} = useLocalSearchParams();

    return (
        <CocktailComponent id={id.toString()} headerPushBack={true}/>
    );
}

