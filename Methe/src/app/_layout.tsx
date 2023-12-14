// Import necessary modules and components
import { Stack } from 'expo-router';
import { useDeviceContext } from "twrnc";
import tw from "@/lib/tailwind";

import { PreferencesContextProvider } from "@/src/contexts/preferences/preferences";
import { FavoritesContextProvider } from "@/src/contexts/favorites";

// AppLayout component definition
export default function AppLayout() {

    // Apply device context from twrnc
    useDeviceContext(tw);

    return (
            <PreferencesContextProvider>
                <FavoritesContextProvider>
                    <Stack>
                        {/* Screen for the main tabs */}
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        {/* Screen for displaying individual cocktail details */}
                        <Stack.Screen name="listing/[id]" options={{headerTitle: ''}}/>
                    </Stack>
                </FavoritesContextProvider>
            </PreferencesContextProvider>
    );
}
