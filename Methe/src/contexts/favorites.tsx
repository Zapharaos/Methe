// Import React and necessary components and utilities
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import utility functions for handling async storage
import { asyncStorage, loadDataJson, storeData, storeDataJson } from "@/src/utils/asyncStorage";

// Define the Favorites interface
export interface Favorites {
    favorites: string[];
    isFavorite: (itemId: string) => boolean;
    toggleFavorite: (itemId: string) => void;
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
    const [favorites, setFavorites] = useState<string[]>([]);

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

    // Function to check if an item is marked as a favorite
    const isFavorite = (itemId: string) => {
        return favorites && favorites.includes(itemId);
    };

    // Function to toggle an item's favorite status
    const toggleFavorite = (itemId: string) => {

        // Update the list of favorites based on the current state
        const updatedFavorites = isFavorite(itemId)
            ? favorites.filter((id) => id !== itemId)
            : [...favorites, itemId];

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
        toggleFavorite,
    };

    // Provide the FavoritesContext with the favoritesValue
    return (
        <FavoritesContext.Provider value={favoritesValue}>
            {children}
        </FavoritesContext.Provider>
    );
};
