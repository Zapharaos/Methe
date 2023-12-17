// Import necessary components and libraries
import { Tabs } from "expo-router";
import { Feather, AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Import context for managing preferences
import {
    usePreferencesContext
} from "@/src/contexts/preferences/preferences";

// Import the Theme enum and color constants
import Theme from "@/src/utils/enums/theme";
const Colors = require('@/src/constants/colors');

// Define the TabsLayout functional component
export default function TabsLayout() {

    // Retrieve the app's preferences from context
    const {i18n, colorScheme} = usePreferencesContext();

    // Determine colors based on the selected color scheme
    const primary = colorScheme === Theme.Dark ? Colors.darkGrayBrown : Colors.palePeach;
    const secondary = colorScheme === Theme.Dark ? Colors.darkGrayBrownSecond : Colors.palePeachSecond;
    const reversed = colorScheme === Theme.Dark ? Colors.palePeach : Colors.darkGrayBrown;
    const textColor = colorScheme === Theme.Dark ? '#fff' : '#000';

    return (
        /*Tabs component with general options*/
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
                headerTitle: '',
                headerTransparent: true,
                tabBarIcon: ({color, size}) => <AntDesign name="home" color={color} size={size}/>,
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
            <Tabs.Screen name="settings" options={{
                title: i18n.t('settings.title'),
                tabBarIcon: ({color, size}) => <Feather name="settings" color={color} size={size}/>,
            }}/>
        </Tabs>
    )
}
