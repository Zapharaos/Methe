// Import necessary React and React Native components and styles
import React from 'react';
import { SafeAreaView, View, I18nManager } from 'react-native';
import tw from '@/lib/tailwind';

// Define the BaseComponent functional component
const BaseComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={tw`flex-1 items-center bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
            <View style={tw`w-11/12 flex-1 items-center`}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default BaseComponent;
