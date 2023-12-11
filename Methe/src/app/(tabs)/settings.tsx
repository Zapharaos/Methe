// Import React and necessary hooks/modules
import React from "react";
import { View } from 'react-native';
import { useRouter } from "expo-router";
import tw from '@/lib/tailwind';

// Import the preferences context and utility function
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import BaseComponent from "@/src/components/base";
import SettingsItem from "@/src/components/settings/item";
import { findValueByKey } from "@/src/utils/utils";

// SettingsScreen component definition
export default function SettingsScreen() {

    // Initialize the router from Expo Router
    const router = useRouter();

    // Retrieve the app's preferences from context
    const {languages, localeKey, i18n, colorSchemes, colorSchemeKey} = usePreferencesContext();

    return (
        <BaseComponent>
            {/* Container for the settings items */}
            <View style={tw`mt-5 w-full rounded-md bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                {/* SettingsItem component for selecting the app's locale */}
                <SettingsItem
                    label={i18n.t('settings.locale.label')}
                    value={findValueByKey(languages, localeKey)}
                    onPress={() => router.push("/(modal)/locale")}
                    isLast={false}
                />
                {/* SettingsItem component for selecting the app's color scheme */}
                <SettingsItem
                    label={i18n.t('settings.colorScheme.label')}
                    value={findValueByKey(colorSchemes, colorSchemeKey)}
                    onPress={() => router.push("/(modal)/colorScheme")}
                    isLast={true}
                />
            </View>
        </BaseComponent>
    );
}
