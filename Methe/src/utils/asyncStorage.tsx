import AsyncStorage from '@react-native-async-storage/async-storage';

export enum asyncStorage {
    Locale = 'locale',
    ColorScheme = 'colorScheme',
    Favorites = 'favourites'
}

export const storeData = async (key:string, value:string) => {
    try {
        await AsyncStorage.setItem('@' + key, value);
    }
    catch (e) {
        console.log("Error storing data", e)
    }
}

export const storeDataJson = async (key:string, value:any[]) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    catch (e) {
        console.log("Error storing data", e)
    }
}

export const loadData = async (key:string) => {
    try {
        const data = await AsyncStorage.getItem('@' + key);
        return data || '';
    }
    catch (e) {
        console.log("Error loading data", e)
        return '';
    }
}

export const loadDataJson = async (key:string) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
    catch (e) {
        console.log("Error loading data", e)
        return '';
    }
}
