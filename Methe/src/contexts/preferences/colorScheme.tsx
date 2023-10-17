import {useEffect, useState} from 'react';
import {useAppColorScheme} from "twrnc";
import Utils from "../../utils/enums/utils";
import Theme from "../../utils/enums/theme";
import tw from "../../../lib/tailwind";
import {StatusBarStyle} from "expo-status-bar";
import {asyncStorage, loadData, storeData} from "../../utils/asyncStorage";
import {Appearance} from "react-native";

export function useColorSchemes() {

    const [colorSchemes, setColorSchemes] = useState(() => {
        const colorSchemes: { key: string; value: string }[] = [
            {key: Theme.System, value: Utils.Empty},
            {key: Theme.Light, value: Utils.Empty},
            {key: Theme.Dark, value: Utils.Empty},
        ];
        return colorSchemes;
    });
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('auto');

    useEffect(() => {
        const getAsyncStorageData = async () => {
            let itemColorScheme:string = Utils.Empty;
            try {
                const valueColorScheme = await loadData(asyncStorage.ColorScheme);
                itemColorScheme = valueColorScheme === Utils.Empty ? colorSchemes[0].key : valueColorScheme;
            } catch(e) {
                // read error
            }
            changeColorScheme(itemColorScheme);
        }
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

        // update the async storage
        const storeAsyncStorageData = async () => {
            await storeData(asyncStorage.ColorScheme, key);
        }
        storeAsyncStorageData().catch(console.error);
    };

    return { colorSchemes, setColorSchemes, colorScheme, changeColorScheme, statusBarStyle };
}

