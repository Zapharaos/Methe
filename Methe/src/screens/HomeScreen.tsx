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
    const [locale, setLocale] = useState(Localization.locale);

    const translations: Record<string, any> = {
        en: { languageLabel: 'English', welcome: 'Hello'},
        fr: { languageLabel: 'Français', welcome: 'Bonjour'},
        ja: { languageLabel: '日本語', welcome: 'こんにちは' }
    };
    let localStorage = {
        theme: '',
        language: ''
    };

    /*i18n.translations = {
        'en': require('./en.json'),
        'nl': require('./nl.json'),
    }*/
    const i18n = new I18n(translations);
    i18n.locale = locale;
    i18n.enableFallback = true;

    const themes: { key: string; value: string }[] = [
        {key: 'system', value: 'System'},
        {key: 'light', value: 'Light'},
        {key: 'dark', value: 'Dark'},
    ]
    const languages: { key: string; value: string }[] = [
        {key: 'system', value: 'System'},
    ];
    for (const key in translations) {
        languages.push({ key, value: translations[key].languageLabel });
    }

    const changeColorScheme = (key: string) => {
        if (localStorage.theme === key) return;
        localStorage.theme = key;

        if (localStorage.theme === 'system') {
            setColorScheme(Appearance.getColorScheme());
            setStatusBarStyle(Appearance.getColorScheme() === 'dark' ? 'light' : 'dark')
        } else if (localStorage.theme !== colorScheme) {
            toggleColorScheme();
            setStatusBarStyle(localStorage.theme === 'dark' ? 'light' : 'dark')
        }
    }
    const changeLanguage = (key: string) => {
        if (localStorage.language === key) return;
        if (key === "system") {
            key = Localization.locale;
        }
        localStorage.language = key;
        setLocale(localStorage.language)
    }

    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown`}>
            <StatusBar style={statusBarStyle} />
            <View style={tw`w-11/12 flex-1 justify-center items-center `}>
                <Text style={tw`text-black dark:text-white`}>{i18n.t('welcome')}</Text>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`mb-1 text-black dark:text-white`}>Language</Text>
                    <SelectList
                        setSelected={changeLanguage}
                        data={languages}
                        save="key"
                    />
                </View>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`mb-1 text-black dark:text-white`}>Theme</Text>
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
