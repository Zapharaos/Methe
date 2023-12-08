import {router, Tabs} from "expo-router";
import {
    usePreferencesContext
} from "@/src/contexts/preferences/preferences";
import {TouchableOpacity} from "react-native";
import { Feather, AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import tw from "@/lib/tailwind";
import Theme from "@/src/utils/enums/theme";
const Colors = require('@/src/constants/colors');

export default function TabsLayout() {

    const {i18n, colorScheme} = usePreferencesContext();

    const primary = colorScheme === Theme.Dark ? Colors.darkGrayBrown : Colors.palePeach;
    const secondary = colorScheme === Theme.Dark ? Colors.darkGrayBrownSecond : Colors.palePeachSecond;
    const reversed = colorScheme === Theme.Dark ? Colors.palePeach : Colors.darkGrayBrown;
    const textColor = colorScheme === Theme.Dark ? '#fff' : '#000';

    return (
        <Tabs screenOptions={{
            unmountOnBlur: true,
            headerStyle: {
                backgroundColor: secondary,
            },
            headerShadowVisible: false,
            headerTintColor: textColor,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: reversed,
            tabBarInactiveTintColor: Colors.midGray,
            tabBarStyle: {
                backgroundColor: secondary,
                borderTopColor: primary,
            },
        }}>
            <Tabs.Screen name="index" options={{
                title: i18n.t('appName'),
                tabBarIcon: ({color, size}) => <AntDesign name="home" color={color} size={size}/>,
                headerRight: () => (
                    <TouchableOpacity style={tw`mr-5`} onPress={() => router.push("/settings")}>
                        <Feather name="settings" size={20} color={textColor} />
                    </TouchableOpacity>
                ),
            }}/>
            <Tabs.Screen name="random" options={{
                headerTitle: '',
                headerTransparent: true,
                tabBarIcon: ({color, size}) => <FontAwesome5 name="dice" color={color} size={size} />,
            }}/>
            <Tabs.Screen name="favourites" options={{
                title: i18n.t('pages.favourites'),
                tabBarIcon: ({color, size}) => <MaterialIcons name="favorite-border" color={color} size={size}/>,
            }}/>
        </Tabs>
    )
}