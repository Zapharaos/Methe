import {Switch, Text, View} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import tw from "@/lib/tailwind";
import {useState} from "react";
import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import BaseComponent from "@/src/components/base";
export default function Modal() {

    const {
        i18n,
    } = usePreferencesContext();

    // If the page was reloaded or navigated to directly, then the modal should be presented as
    // a full screen page. You may need to change the UI to account for this.
    const isPresented = router.canGoBack();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <BaseComponent>
            {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
            {!isPresented && <Link href="../">Dismiss</Link>}
            {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
            <StatusBar style="light" />
            <View style={tw`w-full mt-5 flex-row justify-between`}>

                <Text style={tw`text-left mb-1 font-semibold text-black dark:text-white`}>{i18n.t('settings.colorScheme.label')}</Text>
                <View style={tw`flex-row`}>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </BaseComponent>
    );
}
