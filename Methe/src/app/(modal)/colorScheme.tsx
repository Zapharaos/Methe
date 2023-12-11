// Import React and necessary components and libraries
import React from "react";
import { ScrollView } from "react-native";

// Import context for managing preferences
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";

// Import custom components
import ModalComponent from "@/src/components/modal";
import SettingsItemOptions from "@/src/components/settings/itemOptions";

// Define the ColorSchemeModal functional component
export default function ColorSchemeModal() {

    // Retrieve the app's preferences from context
    const {colorSchemes, colorSchemeKey, changeColorScheme} = usePreferencesContext();

    return (
        <ModalComponent>
            <ScrollView>
                <SettingsItemOptions list={colorSchemes} current={colorSchemeKey} change={changeColorScheme} />
            </ScrollView>
        </ModalComponent>
    );
}
