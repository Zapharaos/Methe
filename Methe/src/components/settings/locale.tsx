// Import necessary components and styles from React Native and external libraries
import React, { Dispatch, SetStateAction } from "react";
import {View} from "react-native";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import ListingOptions from "@/src/components/listingOptions";
import ModalComponent from "@/src/components/modal";
import tw from "@/lib/tailwind";

// Interface for the props of the SearchModal component
interface LocaleModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

// Main component for the search modal
export default function LocaleModal({ visible, setVisible } : LocaleModalProps) {

    // Retrieve the app's preferences from context
    const {i18n, languages, localeKey, changeLocale} = usePreferencesContext();

    return (
        <ModalComponent title={i18n.t('settings.locale.label')} visible={visible} setVisible={setVisible}>
            <View style={tw`mx-5`}>
                <ListingOptions list={languages} current={localeKey} change={changeLocale} />
            </View>
        </ModalComponent>
    );
}

