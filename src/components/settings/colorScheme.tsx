// Import necessary components and styles from React Native and external libraries
import React, { Dispatch, SetStateAction } from "react";
import {View} from "react-native";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import ListingOptions from "@/src/components/listingOptions";
import ModalComponent from "@/src/components/modal";
import tw from "@/lib/tailwind";

// Interface for the props of the SearchModal component
interface ColorSchemeModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

// Main component for the search modal
export default function ColorSchemeModal({ visible, setVisible } : ColorSchemeModalProps) {

    // Retrieve the app's preferences from context
    const {i18n, colorSchemes, colorSchemeKey, changeColorScheme} = usePreferencesContext();

    return (
        <ModalComponent title={i18n.t('settings.colorScheme.label')} visible={visible} setVisible={setVisible}>
            <View style={tw`mx-5`}>
                <ListingOptions list={colorSchemes} current={colorSchemeKey} change={changeColorScheme} />
            </View>
        </ModalComponent>
    );
}

