import { useEffect, useState } from 'react';
import { useAppColorScheme } from 'twrnc';
import { StatusBarStyle } from 'expo-status-bar';
import { Appearance } from 'react-native';
import tw from '@/lib/tailwind';

import { asyncStorage, loadData, storeData } from '@/src/utils/asyncStorage';
import Utils from '@/src/utils/enums/utils';
import Theme from '@/src/utils/enums/theme';

const initialColorSchemes = [
    { key: Theme.System, value: Utils.Empty },
    { key: Theme.Light, value: Utils.Empty },
    { key: Theme.Dark, value: Utils.Empty },
];

export function useColorSchemes() {

    const [colorSchemes, setColorSchemes] = useState(initialColorSchemes);
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [colorSchemeKey, setColorSchemeKey] = useState<string>(initialColorSchemes[0].key);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('auto');

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

    const changeColorScheme = (key: string) => {

        // colorScheme not recognized
        if (!colorSchemes.some(scheme => scheme.key === key)) {
            return;
        }

        // reset to system colorScheme
        if (key === Theme.System) {
            setColorScheme(Appearance.getColorScheme());
        } else if (key !== colorScheme) {
            toggleColorScheme();
        }

        // update the statusBar colorScheme
        setStatusBarStyle(key === Theme.Dark ? Theme.Light : Theme.Dark);
        setColorSchemeKey(key);

        // update the async storage
        const storeAsyncStorageData = async () => {
            await storeData(asyncStorage.ColorScheme, key);
        }
        storeAsyncStorageData().catch(console.error);
    };

    return { colorSchemes, setColorSchemes, colorScheme, colorSchemeKey, changeColorScheme, statusBarStyle };
}

