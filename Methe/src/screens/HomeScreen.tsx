import tw from '../../lib/tailwind';
import rtlDetect from '../../lib/rtl-detect';

import { useAppColorScheme } from 'twrnc';
import {Text, SafeAreaView, View, Appearance, I18nManager} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {StatusBar, StatusBarStyle} from "expo-status-bar";
import {useState} from "react";
import { I18n } from 'i18n-js';
import {getLocales} from "expo-localization";

export default function HomeScreen() {
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
        'auto',
    );
    const [locale, setLocale] = useState(getLocales()[0]);

    const translations: Record<string, any> = {
        en: require('../../locales/en.json'),
        fr: require('../../locales/fr.json'),
        ar: require('../../locales/ar.json')
    };
    let localStorage = {
        theme: '',
        locale: locale
    };

    const i18n = new I18n(translations);
    i18n.locale = locale.languageCode;
    i18n.enableFallback = true;
    I18nManager.forceRTL(rtlDetect.isRtlLang(locale.languageCode));

    const themes: { key: string; value: string }[] = [
        {key: 'system', value: 'System'},
        {key: 'light', value: 'Light'},
        {key: 'dark', value: 'Dark'},
    ]
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

    // TODO : use a package that has all the locales
    const languages: { key: string; value: string }[] = [];
    for (const key in translations) {
        languages.push({ key, value: translations[key].settings.language });
    }
    const changeLanguage = (key: string) => {
        if (locale.languageCode === key) return;
        // TODO : use another package that has all the locales
        const localeUpdated = getLocales().find((l) => l.languageCode === key);
        if (localeUpdated !== undefined) {
            localStorage.locale = localeUpdated;
            setLocale(localeUpdated);
            if(I18nManager.isRTL !== rtlDetect.isRtlLang(key)) {
                I18nManager.forceRTL(rtlDetect.isRtlLang(key));
                console.log(rtlDetect.isRtlLang(key));
                // TODO : popup + reload app
            }
        }
    }

    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
            <StatusBar style={statusBarStyle} />
            <View style={tw`w-11/12 flex-1 justify-center items-center`}>
                <Text style={tw`text-black dark:text-white`}>{i18n.t('appName')}</Text>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left text-black dark:text-white`}>{i18n.t('welcome')} {i18n.t('settings.language')}</Text>
                </View>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left mb-1 text-black dark:text-white`}>Language</Text>
                    <SelectList
                        setSelected={changeLanguage}
                        data={languages}
                        save="key"
                    />
                </View>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left mb-1 text-black dark:text-white`}>Theme</Text>
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
