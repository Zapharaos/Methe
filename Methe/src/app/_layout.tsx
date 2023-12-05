import {router, Stack} from 'expo-router';
import {useDeviceContext} from "twrnc";
import tw from "@/lib/tailwind";
import {
    PreferencesContextProvider, usePreferencesContext
} from "@/src/contexts/preferences/preferences";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Theme from "@/src/utils/enums/theme";
const Colors = require('@/src/constants/colors');
export default function Layout() {
    useDeviceContext(tw);

    return (
            <PreferencesContextProvider>
                <Navigation/>
            </PreferencesContextProvider>
    );
}

function Navigation() {
    const {i18n, colorScheme} = usePreferencesContext();

    const backgroundColor = colorScheme === Theme.Dark ? Colors.darkGrayBrown : Colors.palePeach;
    const textColor = colorScheme === Theme.Dark ? '#fff' : '#000';

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{
                    title: i18n.t('settings.title'),
                    headerBackTitle: i18n.t('pages.home'),
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerShadowVisible: false,
                    headerTintColor: textColor,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
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
                }}
            />
            <Stack.Screen
                name="cocktailDetail"
                options={{
                    title: '',
                    headerBackTitle: i18n.t('pages.home'),
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerShadowVisible: false,
                    headerTintColor: textColor,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack>
    )
}
