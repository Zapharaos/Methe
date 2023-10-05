import { useAppColorScheme } from 'twrnc';
import tw from '../../lib/tailwind';

import {Text, SafeAreaView, View, Appearance} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {StatusBar, StatusBarStyle} from "expo-status-bar";
import {useState} from "react";

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

export default function HomeScreen() {
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
        'auto',
    );

    let localStorageTheme = '';
    const themes = [
        {key: 'system', value: 'System'},
        {key: 'light', value: 'Light'},
        {key: 'dark', value: 'Dark'},
    ]
    const changeColorScheme = (key: string) => {
        if (localStorageTheme === key) return;
        localStorageTheme = key;

        if (localStorageTheme === 'system') {
            setColorScheme(Appearance.getColorScheme());
            setStatusBarStyle(Appearance.getColorScheme() === 'dark' ? 'light' : 'dark')
        } else if (localStorageTheme !== colorScheme) {
            toggleColorScheme();
            setStatusBarStyle(localStorageTheme === 'dark' ? 'light' : 'dark')
        }
    }

    const translations = {
        en: { welcome: 'Hello', name: 'Charlie' },
        ja: { welcome: 'こんにちは' },
    };
    const i18n = new I18n(translations);
    i18n.locale = Localization.locale;
    i18n.enableFallback = true;

    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown`}>
            <StatusBar style={statusBarStyle} />
            <View style={tw`w-11/12 flex-1 justify-center items-center `}>
                <Text style={tw`text-black dark:text-white`}>{i18n.t('welcome')} {i18n.t('name')}</Text>
                <Text style={tw`text-black dark:text-white`}>Current locale: {i18n.locale}</Text>
                <Text style={tw`text-black dark:text-white`}>Device locale: {Localization.getLocales()[0].languageCode}</Text>
                <View style={tw`w-full`}>
                    <SelectList
                        setSelected={changeColorScheme}
                        data={themes}
                        save="key"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
