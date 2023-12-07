import {useEffect, useState} from "react";

import {getRandomCocktailObject} from "@/src/utils/cocktail";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import CocktailsContainerCards from "@/src/components/cards/CocktailsContainerCards";
import BaseComponent from "@/src/components/base";
import {INDEX_RANDOM_COCKTAILS} from "@/src/constants/config";

export default function HomeTab() {
    const [cocktailList, setCocktailList] = useState<Cocktail[]>([])

    useEffect(() => {
        const tempCocktailList :Cocktail[] = [];
        const fetchCocktails = async () => {
            for (let i = 0; i < INDEX_RANDOM_COCKTAILS; i++) {
                try {
                    const cocktail = await getRandomCocktailObject();
                    tempCocktailList.push(cocktail);
                } catch (error) {
                    console.error(error);
                }
            }
            setCocktailList(tempCocktailList);
        };
        fetchCocktails();
    }, []);

    return (
        <BaseComponent>
            <CocktailsContainerCards cocktailList={cocktailList}/>
        </BaseComponent>
    );
}
