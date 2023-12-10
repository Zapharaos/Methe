import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import tw from '@/lib/tailwind';

interface HeaderBaseComponentProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>; // Add style prop for customization
}

const HeaderBaseComponent = ({ children, style }: HeaderBaseComponentProps) => {
    return (
        <View style={[tw`h-24 flex-row items-end justify-between`, style]}>
            {children}
        </View>
    );
};

export default HeaderBaseComponent;
