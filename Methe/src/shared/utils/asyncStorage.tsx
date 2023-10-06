import AsyncStorage from '@react-native-async-storage/async-storage';

export enum asyncStorage {
    Locale = 'locale',
    ColorScheme = 'colorScheme'
}

export const storeData = async (key:string, value:string) => {
    try {
        await AsyncStorage.setItem('@' + key, value);
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
        console.log("Error storing data", e)
        return '';
    }
}