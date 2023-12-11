// Import necessary modules and components
import { Stack } from 'expo-router';
import { useDeviceContext } from "twrnc";
import tw from "@/lib/tailwind";

import { PreferencesContextProvider, usePreferencesContext } from "@/src/contexts/preferences/preferences";
import { FavoritesContextProvider } from "@/src/contexts/favorites";

// AppLayout component definition
export default function AppLayout() {

    // Apply device context from twrnc
    useDeviceContext(tw);

    return (
            <PreferencesContextProvider>
                <FavoritesContextProvider>
                    {/* Render the main navigation layout */}
                    <NavigationLayout/>
                </FavoritesContextProvider>
            </PreferencesContextProvider>
    );
}

// NavigationLayout component definition
function NavigationLayout() {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    return (
        <Stack>
            {/* Screen for the main tabs */}
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            {/* Screen for displaying individual cocktail details */}
            <Stack.Screen name="listing/[id]" options={{headerTitle: ''}}/>
            {/* Modal screen for changing the app's locale */}
            <Stack.Screen name="(modal)/locale" options={{
                    presentation: 'modal',
                    title: i18n.t('settings.locale.label')
                }}/>
            {/* Modal screen for changing the app's color scheme */}
            <Stack.Screen name="(modal)/colorScheme" options={{
                    presentation: 'modal',
                    title: i18n.t('settings.colorScheme.label')
                }}/>
        </Stack>
    )
}
