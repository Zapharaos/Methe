// Import React hooks, utilities, and modules from external libraries
import { useEffect, useState } from 'react';
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import { I18n } from "i18n-js";
import rtlDetect from '@/lib/rtl-detect'; // Assuming 'rtl-detect' provides RTL language detection

// Import enums and constants
import Utils from '@/src/utils/enums/utils';
import { asyncStorage, loadData, storeData } from '@/src/utils/asyncStorage';
import { showCancelOkAlert } from '@/src/utils/alert';

// Define the locales for different languages
const locales: Record<string, any> = {
    en: require('@/locales/en.json'),
    ar: require('@/locales/ar.json'),
    es: require('@/locales/es.json'),
    fr: require('@/locales/fr.json'),
    hi: require('@/locales/hi.json'),
    it: require('@/locales/it.json'),
    ko: require('@/locales/ko.json'),
    ru: require('@/locales/ru.json'),
    sw: require('@/locales/sw.json'),
    zh: require('@/locales/zh.json'),
};

// Custom hook for managing app localization
export function useLocale() {

    // Define default languages including the system language
    const defaultLanguages = [
        { key: Utils.System, value: Utils.Empty },
        ...Object.keys(locales).map((key) => ({
            key,
            value: locales[key].settings.locale.local,
        })),
    ];

    // State variables for languages, locale, and locale key
    const [languages, setLanguages] = useState(defaultLanguages);
    const [locale, setLocale] = useState(getLocales()[0].languageCode);
    const [localeKey, setLocaleKey] = useState(languages[0].key);

    // Create an instance of the I18n library with the provided locales
    const i18n = new I18n(locales);
    i18n.enableFallback = true;
    i18n.locale = locale;

    // useEffect to load locale data from async storage on component mount
    useEffect(() => {
        const getAsyncStorageData = async () => {
            try {
                const valueLocale = await loadData(asyncStorage.Locale);
                const itemLocale = valueLocale === Utils.Empty ? languages[0].key : valueLocale;
                await changeLocale(itemLocale);
            } catch (e) {
                console.error(e);
            }
        };
        getAsyncStorageData().then();
    }, []);

    // Function to change the locale based on the provided key
    const changeLocale = async (key: string) => {

        // Check if the language is already set or not recognized
        if ((locale === localeKey && locale === key) || !languages.some(language => language.key === key)) {
            return;
        }

        // Save the original key before potential reset to the system language
        const keySave = key;

        // Reset to the system language
        if (key === Utils.System) {
            key = getLocales()[0].languageCode;
        }

        // Check if a reload is needed due to RTL change
        const reload = I18nManager.isRTL !== rtlDetect.isRtlLang(key);

        // check if reload is needed
        if (reload) {

            // Show a confirmation alert to the user
            const confirm = await showCancelOkAlert(
                i18n.t('settings.locale.alert.title'),
                i18n.t('settings.locale.alert.message'),
                i18n.t('settings.locale.alert.cancel'),
                i18n.t('settings.locale.alert.confirm'),
                );

            // User canceled the action
            if (!confirm) {
                return;
            }
        }

        // Update the async storage with the selected locale key
        try {
            await storeData(asyncStorage.Locale, key);
            if (reload) {
                // Force RTL based on the new language and trigger an app reload
                I18nManager.forceRTL(!I18nManager.isRTL);
                await Updates.reloadAsync();
            } else {
                // Update state variables without app reload
                setLocale(key);
                setLocaleKey(keySave);
                i18n.locale = key;
            }
        } catch (error) {
            console.error(error);
        }

    };

    // Return an object containing locale-related values and functions
    return { languages, setLanguages, locale, localeKey, changeLocale, i18n };
}

