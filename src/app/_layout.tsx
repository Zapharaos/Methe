// Import necessary modules and components
import {useState} from "react";
import { Stack } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useDeviceContext } from "twrnc";
import tw from "@/lib/tailwind";

import { PreferencesContextProvider } from "@/src/contexts/preferences/preferences";
import { FavoritesContextProvider } from "@/src/contexts/favorites";
import {SplashScreenAnimated} from "@/src/components/splash";

// AppLayout component definition
export default function AppLayout() {

    const [animationOver, setAnimationOver] = useState(false);

    // Apply device context from twrnc
    useDeviceContext(tw);

    // TODO : load elements here
    //  could be improved to load the first 10 random cocktails for example

    if (!animationOver) {
        return (
            <SplashScreenAnimated
                onAnimationFinish={(isCancelled) => {
                    if (!isCancelled) {
                        setAnimationOver(true);
                    }
                }}
            />
        );
    }


    return (
        <PreferencesContextProvider>
            <FavoritesContextProvider>
                <Animated.View style={{ flex: 1 }} entering={FadeIn}>
                    <Stack>
                        {/* Screen for the main tabs */}
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        {/* Screen for displaying individual cocktail details */}
                        <Stack.Screen name="listing/[id]" options={{headerTitle: ''}}/>
                    </Stack>
                </Animated.View>
            </FavoritesContextProvider>
        </PreferencesContextProvider>
    );
}
