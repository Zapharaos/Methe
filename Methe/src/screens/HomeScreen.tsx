import tw from '../../lib/tailwind';
import rtlDetect from '../../lib/rtl-detect';

import { useAppColorScheme } from 'twrnc';
import {Text, SafeAreaView, View, Appearance, I18nManager} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {StatusBar, StatusBarStyle} from "expo-status-bar";
import {useEffect, useState} from "react";
import { I18n } from 'i18n-js';
import {getLocales} from "expo-localization";
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
        'auto',
    );
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [locale, setLocale] = useState(getLocales()[0].languageCode);

    const locales: Record<string, any> = {
        en: require('../../locales/en.json'),
        ar: require('../../locales/ar.json'),
        es: require('../../locales/es.json'),
        fr: require('../../locales/fr.json'),
        hi: require('../../locales/hi.json'),
        it: require('../../locales/it.json'),
        ko: require('../../locales/ko.json'),
        ru: require('../../locales/ru.json'),
        sw: require('../../locales/sw.json'),
        zh: require('../../locales/zh.json'),
    };
    const languages: { key: string; value: string }[] = [
        {key: 'system', value: 'System'},
    ];
    for (const key in locales) {
        languages.push({ key, value: locales[key].settings.locale.local });
    }
    const colorSchemes: { key: string; value: string }[] = [
        {key: 'system', value: 'System'},
        {key: 'light', value: 'Light'},
        {key: 'dark', value: 'Dark'},
    ]

    useEffect(() => {
        const getAsyncStorage = async () => {
            let itemColorScheme:string = '';
            let itemLocale:string = '';
            try {
                const valueColorScheme = await AsyncStorage.getItem('@colorScheme')
                itemColorScheme = valueColorScheme !== null ? valueColorScheme : colorSchemes[0].key;
                const valueLocale = await AsyncStorage.getItem('@locale')
                itemLocale = valueLocale !== null ? valueLocale : languages[0].key;
            } catch(e) {
                // read error
            }
            await changeColorScheme(itemColorScheme);
            await changeLanguage(itemLocale);
        }
        getAsyncStorage().catch(console.error);
    }, []);

    const i18n = new I18n(locales);
    i18n.locale = locale;
    i18n.enableFallback = true;
    I18nManager.forceRTL(rtlDetect.isRtlLang(locale));

    const changeColorScheme = async (key: string) => {

        // colorScheme not recognized
        if (!colorSchemes.some(theme => theme.key === key)) {
            return;
        }

        // reset to system colorScheme
        if (key === 'system') {
            setColorScheme(Appearance.getColorScheme());
        } else if (key !== colorScheme) {
            toggleColorScheme();
        }

        // update the statusBar colorScheme
        setStatusBarStyle(key === 'dark' ? 'light' : 'dark');

        // update the asyncStorage value
        try {
            await AsyncStorage.setItem('@colorScheme', key)
        } catch (e) {
            // save error
        }
    }
    const changeLanguage = async (key: string) => {

        // language already set or not recognized
        if (locale === key || !languages.some(language => language.key === key)) {
            return;
        }

        // reset to system language
        if(key === "system") {
            key = getLocales()[0].languageCode;
        }

        // update
        setLocale(key);
        languages[0].value = i18n.t('settings.system');
        colorSchemes[0].value = i18n.t('settings.system');
        colorSchemes[1].value = i18n.t('settings.colorScheme.light');
        colorSchemes[2].value = i18n.t('settings.colorScheme.dark');

        // update the asyncStorage value
        try {
            await AsyncStorage.setItem('@locale', key)
        } catch (e) {
            // save error
        }

        if (I18nManager.isRTL !== rtlDetect.isRtlLang(key)) {
            I18nManager.forceRTL(!I18nManager.isRTL);
            // TODO : popup
            await Updates.reloadAsync();
        }
    }

    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
            <StatusBar style={statusBarStyle} />
            <View style={tw`w-11/12 flex-1 justify-center items-center`}>
                <Text style={tw`text-black dark:text-white`}>{i18n.t('appName')}</Text>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left text-black dark:text-white`}>{i18n.t('welcome')}</Text>
                </View>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left mb-1 text-black dark:text-white`}>{i18n.t('settings.locale.label')}</Text>
                    <SelectList
                        setSelected={changeLanguage}
                        data={languages}
                        save="key"
                    />
                </View>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left mb-1 text-black dark:text-white`}>{i18n.t('settings.colorScheme.label')}</Text>
                    <SelectList
                        setSelected={changeColorScheme}
                        data={colorSchemes}
                        save="key"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
