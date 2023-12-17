// Import necessary React and React Native components and styles
import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import tw from '@/lib/tailwind';

// Define the properties that the HeaderButton component accepts
interface HeaderButtonProps {
    onPress: () => void;                     // Function to be executed on button press
    iconComponent1: React.ReactElement;      // First icon component
    iconName1: string;                       // Name of the first icon
    iconComponent2?: React.ReactElement;     // Optional second icon component
    iconName2?: string;                      // Optional name of the second icon
    useSecondIcon?: boolean;                 // Flag to determine if the second icon should be used
    buttonStyle?: ViewStyle;                 // Custom styles for the button
    iconStyle?: ViewStyle;                   // Custom styles for the icon
}

// HeaderButton component definition
const HeaderButton: React.FC<HeaderButtonProps> = ({
   onPress,
   iconComponent1,
   iconName1,
   useSecondIcon = false,
   iconComponent2,
   iconName2,
   buttonStyle,
   iconStyle,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[tw`w-10 h-10 items-center justify-center rounded-full border border-midGray bg-darkGrayBrown dark:bg-palePeach`, buttonStyle]}
        >
            {/* Conditional rendering for two icons */}
            {useSecondIcon && iconComponent2 ? (
                React.cloneElement(iconComponent2, {
                    name: iconName2 || '',
                    size: 24,
                    style: [tw`text-palePeach dark:text-darkGrayBrown`, iconStyle],
                })
            ) : (
                React.cloneElement(iconComponent1, {
                    name: iconName1,
                    size: 24,
                    style: [tw`text-palePeach dark:text-darkGrayBrown`, iconStyle],
                })
            )}
        </TouchableOpacity>
    );
}

export default HeaderButton;
