import tw from '../../lib/tailwind';

import {Text, TouchableOpacity, View} from 'react-native';
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {useRouter} from "expo-router";

import {AntDesign, Feather} from '@expo/vector-icons';
import {findValueByKey} from "@/src/utils/utils";
import React from "react";

export default function SettingsScreen() {

    const router = useRouter();
    const {
        languages,
        localeKey,
        i18n,
        colorSchemes,
        colorSchemeKey
    } = usePreferencesContext();

    return (
        <BaseComponent>

            <View style={tw`mt-5 w-full rounded-md bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                <TouchableOpacity style={tw`ml-3 pr-3 pt-2 pb-2 flex-row justify-between border-midGray border-b`} onPress={ () => router.push("/(modal)/locale")}>
                    <Text style={tw`mb-1 text-left text-base text-black dark:text-white`}>{i18n.t('settings.locale.label')}</Text>
                    <View style={tw`flex-row items-center`}>
                        <Text style={tw`mr-3 text-midLight dark:text-midDark`}>{findValueByKey(languages, localeKey)}</Text>
                        <AntDesign name="right" size={18} style={tw`text-midLight dark:text-midDark`} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={tw`ml-3 pr-3 pt-2 pb-2 flex-row justify-between border-midGray`} onPress={ () => router.push("/(modal)/colorScheme")}>
                    <Text style={tw`mb-1 text-left text-base text-black dark:text-white`}>{i18n.t('settings.colorScheme.label')}</Text>
                    <View style={tw`flex-row items-center`}>
                        <Text style={tw`mr-3 text-midLight dark:text-midDark`}>{findValueByKey(colorSchemes, colorSchemeKey)}</Text>
                        <AntDesign name="right" size={18} style={tw`text-midLight dark:text-midDark`} />
                    </View>
                </TouchableOpacity>
            </View>
        </BaseComponent>
    );
}
