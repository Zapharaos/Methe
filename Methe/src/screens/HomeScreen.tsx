import tw from '../../lib/tailwind';

import {Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {usePreferencesContext} from "../contexts/preferences";
import BaseComponent from "../components/base";

export default function HomeScreen() {

    const {
        languages,
        colorSchemes,
        i18n,
        colorScheme,
        changeLanguage,
        changeColorScheme
    } = usePreferencesContext();

    return (
        <BaseComponent>
            <Text style={tw`text-black dark:text-white`}>{i18n.t('appName')}</Text>
            <View style={tw`w-full mt-5`}>
                <Text style={tw`text-left text-black dark:text-white`}>{i18n.t('welcome')}</Text>
            </View>
            <View style={tw`w-full mt-5`}>
                <Text style={tw`text-left mb-1 text-black dark:text-white`}>{i18n.t('settings.locale.label')}</Text>
                <SelectList
                    setSelected={changeLanguage}
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
