// Import necessary React and React Native components and styles
import React from 'react';
import {SafeAreaView, I18nManager, ViewStyle} from 'react-native';
import tw from '@/lib/tailwind';

// Define the BaseComponent functional component
interface BaseComponentProps {
    children: React.ReactNode;
    style?: ViewStyle;
    wrapperComponent?: React.ComponentType<any>;
}

const BaseComponent: React.FC<BaseComponentProps> = ({ children, style, wrapperComponent: WrapperComponent = SafeAreaView }: BaseComponentProps) => {
    return (
        <WrapperComponent style={[tw`flex-1 items-center justify-center bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`, style]}>
            {children}
        </WrapperComponent>
    );
};

export default BaseComponent;
