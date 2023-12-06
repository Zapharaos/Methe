import React from "react";
import {Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from "expo-router";
import {AntDesign} from '@expo/vector-icons';
import tw from '@/lib/tailwind';

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

import BaseComponent from "@/src/components/base";
import {findValueByKey} from "@/src/utils/utils";

export default function SettingsScreen() {

    const router = useRouter();
    const {
        languages,
        localeKey,
        i18n,
        colorSchemes,
        colorSchemeKey
    } = usePreferencesContext();

    const renderSettingItem = (label:string, value:string, onPress: () => void) => (
        <TouchableOpacity
            style={tw`ml-3 pr-3 pt-2 pb-2 flex-row justify-between border-midGray border-b`}
            onPress={onPress}
        >
            <Text style={tw`mb-1 text-left text-base text-black dark:text-white`}>{label}</Text>
            <View style={tw`flex-row items-center`}>
                <Text style={tw`mr-3 text-midLight dark:text-midDark`}>{value}</Text>
                <AntDesign name="right" size={18} style={tw`text-midLight dark:text-midDark`} />
            </View>
        </TouchableOpacity>
    );

    return (
        <BaseComponent>
            <View style={tw`mt-5 w-full rounded-md bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                {renderSettingItem(
                    i18n.t('settings.locale.label'),
                    findValueByKey(languages, localeKey),
                    () => router.push("/(modal)/locale")
                )}
                {renderSettingItem(
                    i18n.t('settings.colorScheme.label'),
                    findValueByKey(colorSchemes, colorSchemeKey),
                    () => router.push("/(modal)/colorScheme")
                )}
            </View>
        </BaseComponent>
    );
}
