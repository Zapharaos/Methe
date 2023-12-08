import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {asyncStorage, loadDataJson, storeData, storeDataJson} from "@/src/utils/asyncStorage";

export interface Favorites {
    favorites: string[];
    isFavorite: (itemId: string) => boolean;
    toggleFavorite: (itemId: string) => void;
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
        return favorites && favorites.includes(itemId);
    };

    const toggleFavorite = (itemId: string) => {
        const updatedFavorites = isFavorite(itemId)
            ? favorites.filter((id) => id !== itemId)
            : [...favorites, itemId];

        setFavorites(updatedFavorites);
        const storeAsyncStorageData = async () => {
            await storeDataJson(asyncStorage.Favorites, updatedFavorites);
        }
        storeAsyncStorageData().catch(console.error);
    };

    const favoritesValue: Favorites = {
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