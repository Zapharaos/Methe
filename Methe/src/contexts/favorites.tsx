// Import React and necessary components and utilities
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import utility functions for handling async storage
import { asyncStorage, loadDataJson, storeDataJson } from "@/src/utils/asyncStorage";
import {Cocktail, CocktailDetail} from "@/src/utils/interface/CocktailInterface";

// Define the Favorites interface
export interface Favorites {
    favorites: Cocktail[];
    isFavorite: (cocktail: CocktailDetail) => boolean;
    toggleFavorite: (cocktail: any) => void;
}

// Create a context for managing favorites
const FavoritesContext = createContext<Favorites | undefined>(undefined);

// Hook to use the FavoritesContext
export function useFavoritesContext() {
    const context = useContext(FavoritesContext);

    if(context === undefined) {
        throw new Error('useFavoritesContext must be used with a FavoritesContext');
    }

    return context;
}

// Component to provide the FavoritesContext and manage favorites state
export function FavoritesContextProvider({ children }: { children: React.ReactNode }) {

    // State variable for managing the list of favorites
    const [favorites, setFavorites] = useState<Cocktail[]>([]);

    // useEffect to load favorites data from async storage on component mount
    useEffect(() => {
        const getAsyncStorageData = async () => {
            try {
                setFavorites(await loadDataJson(asyncStorage.Favorites));
            } catch (e) {
                console.error(e);
            }
        };
        getAsyncStorageData().catch(console.error);
    }, []);

    const getFavoriteFromCocktailDetails = (cocktail: CocktailDetail) => {
        const { cocktailId, cocktailName, cocktailImage } = cocktail;
        return {
            cocktailId,
            cocktailName,
            cocktailImage,
        };
    }

    // Function to check if an item is marked as a favorite
    const isFavorite = (cocktail: CocktailDetail) => {
        return favorites && favorites.some((item) => item.cocktailId === cocktail.cocktailId);
    };

    // Function to toggle an item's favorite status
    const toggleFavorite = (cocktail: any) => {

        // Update the list of favorites based on the current state
        const updatedFavorites = isFavorite(cocktail)
            ? favorites.filter((item) => item.cocktailId !== cocktail.cocktailId)
            : [...favorites, getFavoriteFromCocktailDetails(cocktail)];

        setFavorites(updatedFavorites);

        // Function to store the updated favorites data in async storage
        const storeAsyncStorageData = async () => {
            await storeDataJson(asyncStorage.Favorites, updatedFavorites);
        }
        storeAsyncStorageData().catch(console.error);
    };

    // Create the favoritesValue object to be provided by the context
    const favoritesValue: Favorites = {
        favorites,
        isFavorite,
        toggleFavorite
    };

    // Provide the FavoritesContext with the favoritesValue
    return (
        <FavoritesContext.Provider value={favoritesValue}>
            {children}
        </FavoritesContext.Provider>
    );
};
