import {TouchableOpacity} from "react-native";
import {router, Stack} from 'expo-router';
import {Ionicons} from "@expo/vector-icons";
import tw from "@/lib/tailwind";

import {PreferencesContextProvider, usePreferencesContext} from "@/src/contexts/preferences/preferences";
import {FavoritesContextProvider} from "@/src/contexts/favorites";
import {useDeviceContext} from "twrnc";

import Theme from "@/src/utils/enums/theme";
const Colors = require('@/src/constants/colors');

export default function AppLayout() {
    useDeviceContext(tw);

    return (
            <PreferencesContextProvider>
                <FavoritesContextProvider>
                    <NavigationLayout/>
                </FavoritesContextProvider>
            </PreferencesContextProvider>
    );
}

function NavigationLayout() {
    const {i18n, colorScheme} = usePreferencesContext();

    const textColor = colorScheme === Theme.Dark ? '#fff' : '#000';

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="listing/[id]" options={{headerTitle: ''}}/>
            <Stack.Screen name="(modal)/locale" options={{
                    title: i18n.t('settings.locale.label'),
                    presentation: 'modal',
                    headerTransparent: true,
                    headerTintColor: textColor,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close-outline" color={textColor} size={24} />
                        </TouchableOpacity>
                    ),
                }}/>
            <Stack.Screen name="(modal)/colorScheme" options={{
                    title: i18n.t('settings.colorScheme.label'),
                    presentation: 'modal',
                    headerTransparent: true,
                    headerTintColor: textColor,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close-outline" color={textColor} size={24} />
                        </TouchableOpacity>
                    ),
                }}/>
        </Stack>
    )
}
