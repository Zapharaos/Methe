import React from "react";
import {ScrollView} from "react-native-gesture-handler";

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

import ModalComponent from "@/src/components/modal";
import Selection from "@/src/components/selection";

export default function LocaleModal() {
    const {
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
