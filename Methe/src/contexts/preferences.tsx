import React, {createContext, useContext, useEffect, useState} from 'react';
import {RnColorScheme, useAppColorScheme} from "twrnc";
import Utils from "../utils/enums/utils";
import Theme from "../utils/enums/theme";
import {getLocales} from "expo-localization";
import tw from "../../lib/tailwind";
import {StatusBar, StatusBarStyle} from "expo-status-bar";
import {I18n} from "i18n-js";
import {asyncStorage, loadData, storeData} from "../utils/asyncStorage";
import {Appearance, I18nManager} from "react-native";
import rtlDetect from "../../lib/rtl-detect";
import * as Updates from "expo-updates";

export interface Preferences {
    languages: { key: string; value: string }[];
    colorSchemes: { key: string; value: string }[];
    i18n: I18n;
    colorScheme: RnColorScheme;
    changeLanguage: (key: string) => void;
    changeColorScheme: (key: string) => void;
    locale: string;
}

const PreferencesContext = createContext<Preferences | undefined>(undefined);

export function usePreferencesContext() {
    const context = useContext(PreferencesContext);

    if(context === undefined) {
        throw new Error('usePreferencesContext must be used with a PreferencesContext');
    }

    return context;
}

export function PreferencesContextProvider({ children }: { children: React.ReactNode }) {

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
    };
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
    };
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

    const preferences: Preferences = {
        languages,
        colorSchemes,
        i18n,
        colorScheme,
        changeLanguage,
        changeColorScheme,
        locale
    };

    return (
        <PreferencesContext.Provider value={preferences}>
            <StatusBar style={statusBarStyle} />
            {children}
        </PreferencesContext.Provider>
    );
}

