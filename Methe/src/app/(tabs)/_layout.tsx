import {router, Tabs} from "expo-router";
import {
    usePreferencesContext
} from "@/src/contexts/preferences/preferences";
import {TouchableOpacity} from "react-native";
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import tw from "@/lib/tailwind";
import Theme from "@/src/utils/enums/theme";
const Colors = require('@/src/constants/colors');

const Layout = () => {

    const {i18n, colorScheme} = usePreferencesContext();

    const backgroundColor = colorScheme === Theme.Dark ? Colors.darkGrayBrown : Colors.palePeach;
    const textColor = colorScheme === Theme.Dark ? '#fff' : '#000';

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: backgroundColor,
        }}>
            <Tabs.Screen name="index" options={{
                title: i18n.t('appName'),
                tabBarLabel: i18n.t('pages.home'),
                tabBarIcon: ({color, size}) => <AntDesign name="home" color={color} size={size}/>,
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                headerShadowVisible: false,
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <TouchableOpacity style={tw`mr-5`} onPress={() => router.push("/settings")}>
                        <Feather name="settings" size={20} color={textColor} />
                    </TouchableOpacity>
                ),
            }}/>
            <Tabs.Screen name="favourites" options={{
                title: i18n.t('pages.favourites'),
                tabBarIcon: ({color, size}) => <MaterialIcons name="favorite-border" color={color} size={size}/>,
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