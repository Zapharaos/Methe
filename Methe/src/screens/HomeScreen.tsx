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
import {asyncStorage, storeData, loadData} from '../shared/utils/asyncStorage'
import Theme from '../shared/utils/enums/theme'
import Utils from '../shared/utils/enums/utils'

export default function HomeScreen() {

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
    const [languages, setLanguages] = useState(() => {
        const languages: { key: string; value: string }[] = [
            {key: Utils.System, value: Utils.Empty},
        ];
        for (const key in locales) {
            languages.push({ key, value: locales[key].settings.locale.local });
        }
        return languages;
    });
    const [colorSchemes, setColorSchemes] = useState(() => {
        const colorSchemes: { key: string; value: string }[] = [
            {key: Theme.System, value: Utils.Empty},
            {key: Theme.Light, value: Utils.Empty},
            {key: Theme.Dark, value: Utils.Empty},
        ];
        return colorSchemes;
    });

    const [locale, setLocale] = useState(getLocales()[0].languageCode);
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('auto');

    const i18n = new I18n(locales);
    i18n.enableFallback = true;
    i18n.locale = locale;

    useEffect(() => {
        const getAsyncStorageData = async () => {
            let itemColorScheme:string = Utils.Empty;
            let itemLocale:string = Utils.Empty;
            try {
                const valueLocale = await loadData(asyncStorage.Locale);
                itemLocale = valueLocale === Utils.Empty ? languages[0].key : valueLocale;
                const valueColorScheme = await loadData(asyncStorage.ColorScheme);
                itemColorScheme = valueColorScheme === Utils.Empty ? colorSchemes[0].key : valueColorScheme;
            } catch(e) {
                // read error
            }
            changeColorScheme(itemColorScheme);
            changeLanguage(itemLocale);
        }
        getAsyncStorageData().catch(console.error);
    }, []);

    const changeColorScheme = (key: string) => {

        // colorScheme not recognized
        if (!colorSchemes.some(theme => theme.key === key)) {
            return;
        }

        // reset to system colorScheme
        if (key === Utils.System) {
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
    }
    const changeLanguage = (key: string) => {
        // language already set or not recognized
        if (locale === key || !languages.some(language => language.key === key)) {
            return;
        }

        // reset to system language
        if(key === Utils.System) {
            key = getLocales()[0].languageCode;
        }

        // update the async storage
        const storeAsyncStorageData = async () => {
            await storeData(asyncStorage.Locale, key);
        }
        storeAsyncStorageData().catch(console.error);

        // update the language
        setLocale(key);
        const updateI18N = async () => {
            i18n.locale = key;
            if (I18nManager.isRTL !== rtlDetect.isRtlLang(key)) {
                I18nManager.forceRTL(!I18nManager.isRTL);
                // TODO : popup
                await Updates.reloadAsync();
            }
        }
        updateI18N().catch(console.error);
    }
    useEffect(() => {
        const updateColorSchemes = () => {
            const updatedColorSchemes = [...colorSchemes];
            updatedColorSchemes.forEach((colorScheme) => {
                colorScheme.value = i18n.t('settings.colorScheme.' + colorScheme.key);
            });
            setColorSchemes(updatedColorSchemes);
        }
        updateColorSchemes();

        const updateLocaleSystemLabel = () => {
            const updatedLanguages = [...languages];
            updatedLanguages[0].value = i18n.t('settings.locale.' + updatedLanguages[0].key);
            setLanguages(updatedLanguages);
        }
        updateLocaleSystemLabel();
    }, [locale]);

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
                        placeholder={languages.find(item => item.key === locale)?.value}
                        searchPlaceholder={i18n.t('search')}
                        notFoundText={i18n.t('notFound')}
                        dropdownTextStyles={tw`text-black dark:text-white`}
                        inputStyles={tw`text-black dark:text-white`}
                    />
                </View>
                <View style={tw`w-full mt-5`}>
                    <Text style={tw`text-left mb-1 text-black dark:text-white`}>{i18n.t('settings.colorScheme.label')}</Text>
                    <SelectList
                        setSelected={changeColorScheme}
                        data={colorSchemes}
                        placeholder={colorSchemes.find(item => item.key === colorScheme)?.value}
                        searchPlaceholder={i18n.t('search')}
                        notFoundText={i18n.t('notFound')}
                        dropdownTextStyles={tw`text-black dark:text-white`}
                        inputStyles={tw`text-black dark:text-white`}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
