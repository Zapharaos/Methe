// Import necessary React and React Native components and styles
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useHeaderHeight } from "@react-navigation/elements";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from '@/lib/tailwind';

// Import the usePreferencesContext for retrieving app preferences
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";

// Import the Theme enum for determining text color based on color scheme
import Theme from "@/src/utils/enums/theme";

// ModalComponent for displaying modals with consistent styling
const ModalComponent = ({ children }: { children: React.ReactNode }) => {

    // Retrieve the app's preferences from context
    const {colorScheme} = usePreferencesContext();

    // Determine text color based on the selected color scheme
    const textColor = colorScheme === Theme.Dark ? '#fff' : '#000';

    return (
        <View style={[{ paddingTop: useHeaderHeight() }, tw`flex-1 items-center bg-palePeach dark:bg-darkGrayBrown`]}>
            {/* Centralize the Stack Screen options for all the modals */}
            <Stack.Screen
                options={{
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
            {/* View to contain the main content of the modal */}
            <View style={tw`w-11/12`}>
                {children}
            </View>
        </View>
    );
};

export default ModalComponent;
