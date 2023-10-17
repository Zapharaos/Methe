import React from 'react';
import tw from '../../lib/tailwind';
import { SafeAreaView, View, I18nManager } from 'react-native';

const BaseComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
            <View style={tw`w-11/12 flex-1 justify-center items-center`}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default BaseComponent;
