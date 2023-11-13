import tw from '../../lib/tailwind';

import {Switch, Text, TouchableOpacity, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list'
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {Link, useRouter} from "expo-router";

import { AntDesign } from '@expo/vector-icons';
import {useState} from "react";

export default function SettingsScreen() {

    const router = useRouter();
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
            <TouchableOpacity style={tw`w-full mt-5 flex-row justify-between`} onPress={ () => router.push("/(modal)/locale")}>
                <Text style={tw`text-left mb-1 font-semibold text-black dark:text-white`}>{i18n.t('settings.locale.label')}</Text>
                <View style={tw`flex-row`}>
                    <Text style={tw`mr-3 text-midLight dark:text-midDark`}>Current</Text>
                    <AntDesign name="right" size={18} style={tw`text-midLight dark:text-midDark`} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={tw`w-full mt-5 flex-row justify-between`} onPress={ () => router.push("/(modal)/colorScheme")}>
                <Text style={tw`text-left mb-1 font-semibold text-black dark:text-white`}>{i18n.t('settings.colorScheme.label')}</Text>
                <View style={tw`flex-row`}>
                    <Text style={tw`mr-3 text-midLight dark:text-midDark`}>Current</Text>
                    <AntDesign name="right" size={18} style={tw`text-midLight dark:text-midDark`} />
                </View>
            </TouchableOpacity>

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
