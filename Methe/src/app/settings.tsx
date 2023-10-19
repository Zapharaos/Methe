import tw from '../../lib/tailwind';

import {Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {Link} from "expo-router";

export default function SettingsScreen() {

    const {
        languages,
        changeLocale,
        i18n,
        colorSchemes,
        colorScheme,
        changeColorScheme
    } = usePreferencesContext();

    return (
        <BaseComponent>
            <Link href="/(modal)/locale">Present modal</Link>
            <View style={tw`w-full mt-5`}>
                <Text style={tw`text-left mb-1 text-black dark:text-white`}>{i18n.t('settings.locale.label')}</Text>
                <SelectList
                    setSelected={changeLocale}
                    data={languages}
                    placeholder={languages.find(item => item.key === i18n.locale)?.value}
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
        </BaseComponent>
    );
}
