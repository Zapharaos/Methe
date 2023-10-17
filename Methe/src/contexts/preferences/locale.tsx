import {useEffect, useState} from 'react';
import Utils from "../../utils/enums/utils";
import {getLocales} from "expo-localization";
import {I18n} from "i18n-js";
import {asyncStorage, loadData, storeData} from "../../utils/asyncStorage";
import {I18nManager} from "react-native";
import rtlDetect from "../../../lib/rtl-detect";
import * as Updates from "expo-updates";

export function useLocale() {

    const locales: Record<string, any> = {
        en: require('../../../locales/en.json'),
        ar: require('../../../locales/ar.json'),
        es: require('../../../locales/es.json'),
        fr: require('../../../locales/fr.json'),
        hi: require('../../../locales/hi.json'),
        it: require('../../../locales/it.json'),
        ko: require('../../../locales/ko.json'),
        ru: require('../../../locales/ru.json'),
        sw: require('../../../locales/sw.json'),
        zh: require('../../../locales/zh.json'),
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
    const [locale, setLocale] = useState(getLocales()[0].languageCode);

    const i18n = new I18n(locales);
    i18n.enableFallback = true;
    i18n.locale = locale;

    useEffect(() => {
        const getAsyncStorageData = async () => {
            let itemLocale:string = Utils.Empty;
            try {
                const valueLocale = await loadData(asyncStorage.Locale);
                itemLocale = valueLocale === Utils.Empty ? languages[0].key : valueLocale;
            } catch(e) {
                // read error
            }
            changeLocale(itemLocale);
        }
        getAsyncStorageData().catch(console.error);
    }, []);

    const changeLocale = (key: string) => {
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

    return { languages, setLanguages, locale, changeLocale, i18n };
}

