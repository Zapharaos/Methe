// Import React hooks and utilities from external libraries
import { useEffect, useState } from 'react';
import { useAppColorScheme } from 'twrnc'; // Assuming 'twrnc' provides a custom hook for color schemes
import { StatusBarStyle } from 'expo-status-bar';
import { Appearance } from 'react-native';
import tw from '@/lib/tailwind'; // Assuming 'tailwind' is a utility for styling

// Import utility functions for handling async storage
import { asyncStorage, loadData, storeData } from '@/src/utils/asyncStorage';

// Import enums and constants
import Utils from '@/src/utils/enums/utils';
import Theme from '@/src/utils/enums/theme';

// Define initial color schemes with keys and default values
const initialColorSchemes = [
    { key: Theme.System, value: Utils.Empty },
    { key: Theme.Light, value: Utils.Empty },
    { key: Theme.Dark, value: Utils.Empty },
];

// Custom hook for managing color schemes
export function useColorSchemes() {

    // State variables for color schemes and related values
    const [colorSchemes, setColorSchemes] = useState(initialColorSchemes);
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [colorSchemeKey, setColorSchemeKey] = useState<string>(initialColorSchemes[0].key);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('auto');

    // useEffect to load color scheme data from async storage on component mount
    useEffect(() => {
        const getAsyncStorageData = async () => {
            try {
                const valueColorScheme = await loadData(asyncStorage.ColorScheme);
                const itemColorScheme = valueColorScheme === Utils.Empty ? colorSchemes[0].key : valueColorScheme;
                changeColorScheme(itemColorScheme);
            } catch (e) {
                console.error(e);
            }
        };
        getAsyncStorageData().catch(console.error);
    }, []);

    // Function to change the color scheme based on the provided key
    const changeColorScheme = (key: string) => {

        // Check if the provided color scheme key is recognized
        if (!colorSchemes.some(scheme => scheme.key === key)) {
            return;
        }

        // Reset to the system color scheme if requested
        if (key === Theme.System) {
            setColorScheme(Appearance.getColorScheme());
        } else if (key !== colorScheme) {
            toggleColorScheme();
        }

        // Update the status bar style based on the color scheme
        setStatusBarStyle(key === Theme.Dark ? Theme.Light : Theme.Dark);
        setColorSchemeKey(key);

        // Update the async storage with the selected color scheme key
        const storeAsyncStorageData = async () => {
            await storeData(asyncStorage.ColorScheme, key);
        }
        storeAsyncStorageData().catch(console.error);
    };

    // Return an object containing color scheme-related values and functions
    return { colorSchemes, setColorSchemes, colorScheme, colorSchemeKey, changeColorScheme, statusBarStyle };
}

