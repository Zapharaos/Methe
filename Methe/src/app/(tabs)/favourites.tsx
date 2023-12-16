// Import React hooks
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/core";

// Import context for managing favorites
import { useFavoritesContext } from "@/src/contexts/favorites";

// Import interfaces and utility functions
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import { getCocktailInfoById } from "@/src/utils/cocktail";

// Import custom components
import CocktailsFlatlist from "@/src/components/cocktail/flatList";
import Loader from "@/src/components/loader";
import BaseComponent from "@/src/components/base";

// Define the FavouritesTab functional component
export default function FavouritesTab() {

    // Retrieve favorites from the context
    const {favorites} = useFavoritesContext();

    // Render the list of cocktails once data is loaded
    return (
        <BaseComponent>
            <CocktailsFlatlist cocktails={favorites}/>
        </BaseComponent>
    )
}
