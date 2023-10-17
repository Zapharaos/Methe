import tw from '../../lib/tailwind';

import {Text, SafeAreaView, View, Appearance, I18nManager} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {Preferences, usePreferencesContext} from "../contexts/preferences";

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
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
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
            </View>
        </SafeAreaView>
    );
}
