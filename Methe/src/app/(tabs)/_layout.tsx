import {router, Tabs} from "expo-router";
import {
    usePreferencesContext
} from "@/src/contexts/preferences/preferences";
import {TouchableOpacity} from "react-native";
import { Feather } from '@expo/vector-icons';

const Layout = () => {

    const {i18n, colorScheme} = usePreferencesContext();

    const backgroundColor = colorScheme === 'dark' ? '#4D3E3E' : '#FEECCA';
    const textColor = colorScheme === 'dark' ? '#fff' : '#000';

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: i18n.t('appName'),
                tabBarLabel: i18n.t('pages.home'),
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                headerShadowVisible: false,
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push("/settings")}>
                        <Feather name="settings" size={24} color="white" />
                    </TouchableOpacity>
                ),
            }}/>
            <Tabs.Screen name="favourites" options={{
                title: i18n.t('pages.favourites'),
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                headerShadowVisible: false,
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}/>
        </Tabs>
    )
}

export default Layout;