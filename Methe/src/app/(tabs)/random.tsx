// Import React and necessary hooks/modules
import React, { useEffect, useState } from "react";

// Import utility function to fetch a random cocktail
import { getRandomCocktailObject } from "@/src/utils/cocktail";

// Import interface for Cocktail
import { Cocktail } from "@/src/utils/interface/CocktailInterface";

// Import CocktailDetails component and Loader
import CocktailDetails from "@/src/components/cocktail/details";
import Loader from "@/src/components/loader";

// RandomTab functional component definition
export default function RandomTab() {

    // State variables to manage the cocktail ID and loading state
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch a random cocktail on component mount
    useEffect(() => {
        const fetchCocktail = async () => {
            // Retrieve a random cocktail object and set its ID to state
            const cocktail: Cocktail = await getRandomCocktailObject();
            setId(cocktail.cocktailId);
            // Mark loading as false once the cocktail is fetched
            setLoading(false);
        };
        fetchCocktail();
    }, []);

    // Render a loader while data is being fetched
    if (loading) {
        return (
            <Loader />
        )
    }

    // Render the CocktailDetails component with the fetched cocktail ID
    return (
        <CocktailDetails id={id} />
    );
}
