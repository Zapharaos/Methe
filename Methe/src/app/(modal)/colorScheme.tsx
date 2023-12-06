import React from "react";
import {ScrollView} from "react-native-gesture-handler";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

import ModalComponent from "@/src/components/modal";
import Selection from "@/src/components/selection";

export default function ColorSchemeModal() {
    const {
        colorSchemes,
        colorSchemeKey,
        changeColorScheme
    } = usePreferencesContext();

    return (
        <ModalComponent>
            <ScrollView>
                <Selection list={colorSchemes} current={colorSchemeKey} change={changeColorScheme} />
            </ScrollView>
        </ModalComponent>
    );
}
