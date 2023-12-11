// Import React and necessary components and libraries
import React from "react";
import {ScrollView, View} from "react-native";

// Import context for managing preferences
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";

// Import custom components
import ModalComponent from "@/src/components/modal";
import SettingsItemOptions from "@/src/components/settings/itemOptions";
import tw from "@/lib/tailwind";

// Define the LocaleModal functional component
export default function LocaleModal() {

    // Retrieve the app's preferences from context
    const {languages, localeKey, changeLocale} = usePreferencesContext();

    return (
        <ModalComponent>
            <ScrollView style={tw`w-full`} contentContainerStyle={tw`items-center`}>
                <View style={tw`w-11/12`}>
                    <SettingsItemOptions list={languages} current={localeKey} change={changeLocale} />
                </View>
            </ScrollView>
        </ModalComponent>
    );
}
