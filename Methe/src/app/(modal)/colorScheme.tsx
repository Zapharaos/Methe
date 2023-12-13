// Import React and necessary components and libraries
import React from "react";
import {ScrollView, View} from "react-native";
import tw from '@/lib/tailwind';

// Import context for managing preferences
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";

// Import custom components
import ModalComponent from "@/src/components/modal";
import ListingOptions from "@/src/components/listingOptions";

// Define the ColorSchemeModal functional component
export default function ColorSchemeModal() {

    // Retrieve the app's preferences from context
    const {colorSchemes, colorSchemeKey, changeColorScheme} = usePreferencesContext();

    return (
        <ModalComponent>
            {/* View to contain the main content of the modal */}
            <ScrollView style={tw`w-full`} contentContainerStyle={tw`items-center`}>
                <View style={tw`w-11/12`}>
                    <ListingOptions list={colorSchemes} current={colorSchemeKey} change={changeColorScheme} />
                </View>
            </ScrollView>
        </ModalComponent>
    );
}
