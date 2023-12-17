// Import necessary React and React Native components and styles
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import tw from '@/lib/tailwind';

// Define the expected props for the Header component
interface HeaderProps {
    children: React.ReactNode;          // Child components to be rendered within the header
    style?: StyleProp<ViewStyle>;       // Additional styles for the header
}

// Functional component representing a header with flexible styling
const Header = ({ children, style }: HeaderProps) => {
    return (
        <View style={[tw`h-24 flex-row items-end justify-between`, style]}>
            {children}
        </View>
    );
};

export default Header;
