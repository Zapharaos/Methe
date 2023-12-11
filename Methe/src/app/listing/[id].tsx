// Import React and necessary hooks/modules
import React from "react";
import { useLocalSearchParams } from "expo-router";

// Import the CocktailDetails component
import CocktailDetails from "@/src/components/cocktail/details";

// CocktailDetailScreen component definition
export default function CocktailDetailScreen() {
    // Retrieve the 'id' parameter from local search params using Expo Router's useLocalSearchParams
    const { id } = useLocalSearchParams();

    return (
        // Render the CocktailDetails component with the retrieved 'id' and a back button in the header
        <CocktailDetails id={id.toString()} headerPushBack={true} />
    );
}
