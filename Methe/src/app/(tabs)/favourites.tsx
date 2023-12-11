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

    // State variables to manage the list of cocktails and loading state
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const [loading, setLoading] = useState(true);

    // Check if the tab is currently focused
    const isFocused = useIsFocused();

    // Function to fetch details of favorite cocktails
    const fetchCocktails = async (tempCocktails: Cocktail[]) => {
        for (const id of favorites) {
            try {
                const cocktail = await getCocktailInfoById(id);
                tempCocktails.push(cocktail);
            } catch (error) {
                console.error(error);
            }
        }
        // Update the state with fetched cocktails and mark loading as false
        setCocktails(tempCocktails);
        setLoading(false);
    };

    // Initial fetch of cocktails on component mount
    useEffect(() => {
        const fetchData = async () => {
            await fetchCocktails([]);
        };
        fetchData();
    }, []);


    // Refresh the favorites on tab focus
    useEffect(() => {
        if (isFocused && !loading) {
            const fetchData = async () => {
                await fetchCocktails([]);
            };
            fetchData();
        }
    }, [isFocused]);

    // Render a loader while data is being fetched
    if(loading) {
        return (
            <Loader/>
        )
    }

    // Render the list of cocktails once data is loaded
    return (
        <BaseComponent>
            <CocktailsFlatlist cocktails={cocktails}/>
        </BaseComponent>
    )
}
