import React from "react";
import {ScrollView} from "react-native-gesture-handler";
import ModalComponent from "@/src/components/modal";
import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import Selection from "@/src/components/selection";

export default function Modal() {
    const {
        i18n,
        languages,
        localeKey,
        changeLocale
    } = usePreferencesContext();

    return (
        <ModalComponent>
            <ScrollView>
                <Selection list={languages} current={localeKey} change={changeLocale} />
            </ScrollView>
        </ModalComponent>
    );
}
