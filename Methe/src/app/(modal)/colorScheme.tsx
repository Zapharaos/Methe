import React from "react";
import {ScrollView} from "react-native-gesture-handler";
import ModalComponent from "@/src/components/modal";
import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import Selection from "@/src/components/selection";

export default function Modal() {
    const {
        i18n,
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
