import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncStorage, loadData, loadDataJson} from "@/src/utils/asyncStorage";
import Utils from "@/src/utils/enums/utils";

export interface Favorites {
    favorites: string[];
    isFavorite: (itemId: string) => boolean;
    toggleFavorite: (itemId: string) => Promise<void>;
}

const FavoritesContext = createContext<Favorites | undefined>(undefined);

export function useFavoritesContext() {
    const context = useContext(FavoritesContext);

    if(context === undefined) {
        throw new Error('useFavoritesContext must be used with a FavoritesContext');
    }

    return context;
}

export function FavoritesContextProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

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

    const isFavorite = (itemId: string) => {
        return favorites.includes(itemId);
    };

    const toggleFavorite = async (itemId: string) => {
        try {
            const updatedFavorites = isFavorite(itemId)
                ? favorites.filter((id) => id !== itemId)
                : [...favorites, itemId];

            await AsyncStorage.setItem(asyncStorage.Favorites, JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const favoritesValue = {
        favorites,
        isFavorite,
        toggleFavorite,
    };

    return (
        <FavoritesContext.Provider value={favoritesValue}>
            {children}
        </FavoritesContext.Provider>
    );
};