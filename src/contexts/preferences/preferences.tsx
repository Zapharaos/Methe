// Import React hooks, utilities, and modules from external libraries
import React, { createContext, useContext, useEffect } from 'react';
import { RnColorScheme } from "twrnc";
import { I18n } from "i18n-js";
import { setStatusBarStyle, StatusBarStyle } from "expo-status-bar";

// Import custom hooks for managing color schemes and locales
import { useColorSchemes } from "./colorScheme";
import { useLocale } from "./locale";

// Define the interface for preferences
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
    statusBarStyle: StatusBarStyle;
}

// Create a context for preferences
const PreferencesContext = createContext<Preferences | undefined>(undefined);

// Custom hook for using the preferences context
export function usePreferencesContext() {
    const context = useContext(PreferencesContext);

    if(context === undefined) {
        throw new Error('usePreferencesContext must be used with a PreferencesContext');
    }

    return context;
}

// Component for providing the preferences context to its children
export function PreferencesContextProvider({ children }: { children: React.ReactNode }) {

    // Use custom hooks for managing color schemes and locales
    const { languages, setLanguages, locale, localeKey, changeLocale, i18n } = useLocale();
    const { colorSchemes, setColorSchemes, colorScheme, colorSchemeKey, changeColorScheme, statusBarStyle } = useColorSchemes();

    // useEffect to update color schemes and locale system label on locale change
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

    // useEffect to set the status bar style based on the updated status bar style
    useEffect(() => {
        setStatusBarStyle(statusBarStyle)
    }, [statusBarStyle]);

    // Define the preferences object with various properties and functions
    const preferences: Preferences = {
        languages,
        locale,
        localeKey,
        changeLocale,
        i18n,
        colorSchemes,
        colorScheme,
        colorSchemeKey,
        changeColorScheme,
        statusBarStyle
    };

    // Provide the preferences context to the children
    return (
        <PreferencesContext.Provider value={preferences}>
            {children}
        </PreferencesContext.Provider>
    );
}

