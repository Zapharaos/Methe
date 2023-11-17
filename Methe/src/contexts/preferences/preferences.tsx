import React, {createContext, useContext, useEffect} from 'react';
import {RnColorScheme} from "twrnc";
import {I18n} from "i18n-js";
import {useColorSchemes} from "./colorScheme";
import {useLocale} from "./locale";
import {StatusBar} from "expo-status-bar";

export interface Preferences {
    languages: { key: string; value: string }[];
    locale: string;
    localeKey: string;
    changeLocale: (key: string) => void;
    i18n: I18n;
    colorSchemes: { key: string; value: string }[];
    colorScheme: RnColorScheme;
    colorSchemeKey: string;
    changeColorScheme: (key: string) => void;
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

    const { languages, setLanguages, locale, localeKey, changeLocale, i18n } = useLocale();
    const { colorSchemes, setColorSchemes, colorScheme, colorSchemeKey, changeColorScheme, statusBarStyle } = useColorSchemes();

    useEffect(() => {
        const updateColorSchemes = () => {
            const updatedColorSchemes = [...colorSchemes];
            updatedColorSchemes.forEach((colorScheme: { key: string; value: string }) => {
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
        locale,
        localeKey,
        changeLocale,
        i18n,
        colorSchemes,
        colorScheme,
        colorSchemeKey,
        changeColorScheme
    };

    return (
        <PreferencesContext.Provider value={preferences}>
            <StatusBar style='dark' />
            {children}
        </PreferencesContext.Provider>
    );
}

