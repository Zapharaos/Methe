import { Stack } from 'expo-router';
import {useDeviceContext} from "twrnc";
import tw from "../../lib/tailwind";
import {
    PreferencesContextProvider, usePreferencesContext
} from "../contexts/preferences/preferences";

export default function Layout() {
    useDeviceContext(tw);

    return (
            <PreferencesContextProvider>
                <Navigation/>
            </PreferencesContextProvider>
    );
}

function Navigation() {
    const {i18n} = usePreferencesContext();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="settings"
            />
            <Stack.Screen
                name="(modal)/locale"
                options={{
                    presentation: 'modal',
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="(modal)/colorScheme"
                options={{
                    title: i18n.t('welcome'),
                    presentation: 'modal',
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack>
    )
}
