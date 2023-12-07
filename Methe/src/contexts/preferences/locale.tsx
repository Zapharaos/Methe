import { useEffect, useState } from 'react';
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import {I18n} from "i18n-js";
import rtlDetect from '@/lib/rtl-detect';

import Utils from '@/src/utils/enums/utils';
import { asyncStorage, loadData, storeData } from '@/src/utils/asyncStorage';
import { showCancelOkAlert } from '@/src/utils/alert';

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

export function useLocale() {

    const defaultLanguages = [
        { key: Utils.System, value: Utils.Empty },
        ...Object.keys(locales).map((key) => ({
            key,
            value: locales[key].settings.locale.local,
        })),
    ];
    const [languages, setLanguages] = useState(defaultLanguages);
    const [locale, setLocale] = useState(getLocales()[0].languageCode);
    const [localeKey, setLocaleKey] = useState(languages[0].key);

    const i18n = new I18n(locales);
    i18n.enableFallback = true;
    i18n.locale = locale;

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

    const changeLocale = async (key: string) => {
        // language already set or not recognized
        if ((locale === localeKey && locale === key) || !languages.some(language => language.key === key)) {
            return;
        }

        const keySave = key;

        // reset to system language
        if (key === Utils.System) {
            key = getLocales()[0].languageCode;
        }

        const reload = I18nManager.isRTL !== rtlDetect.isRtlLang(key);

        // check if reload is needed
        if (reload) {

            const confirm = await showCancelOkAlert(
                i18n.t('settings.locale.alert.title'),
                i18n.t('settings.locale.alert.message'),
                i18n.t('settings.locale.alert.cancel'),
                i18n.t('settings.locale.alert.confirm'),
                );

            if (!confirm) {
                return; // User canceled the action
            }
        }

        // update the async storage
        try {
            await storeData(asyncStorage.Locale, key);
            if (reload) {
                I18nManager.forceRTL(!I18nManager.isRTL);
                await Updates.reloadAsync();
            } else {
                setLocale(key);
                setLocaleKey(keySave);
                i18n.locale = key;
            }
        } catch (error) {
            console.error(error);
        }

    };

    return { languages, setLanguages, locale, localeKey, changeLocale, i18n };
}

