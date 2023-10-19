import { Stack } from 'expo-router';
import {useDeviceContext} from "twrnc";
import tw from "../../lib/tailwind";
import {PreferencesContextProvider} from "../contexts/preferences/preferences";

export default function Layout() {
    useDeviceContext(tw);
    return (
        <PreferencesContextProvider>
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
            </Stack>
        </PreferencesContextProvider>
    );
}
