// Import necessary React and React Native components and styles
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

// Define the props interface for the Selection component
interface SelectionProps {
    list: { key: string; value: string }[]; // List of items with keys and values
    current: string;                        // Current selection key
    change: (key: string) => void;          // Function to be called on selection change
}

// Define the Selection functional component
const SettingsItemOptions: React.FC<SelectionProps> = ({ list, current, change }) => (
    <View style={tw`mt-5 rounded-md bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
        {/* Iterate over the list and render a TouchableOpacity for each item */}
        {list.map(({ key, value }, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    tw`ml-3 pr-3 pt-2 pb-2 flex-row justify-between border-midGray`,
                    // Add a bottom border to all items except the last one
                    index === list.length - 1 ? null : tw`border-b`,
                ]}
                onPress={() => {
                    change(key);
                }}
            >
                {/* Display the value of the item */}
                <Text style={tw`text-left text-base text-black dark:text-white`}>{value}</Text>
                {/* Display a check mark if the item is the current selection */}
                {key === current && <Feather name="check" size={24} style={tw`text-midLight dark:text-midDark`} />}
            </TouchableOpacity>
        ))}
    </View>
);

export default SettingsItemOptions;
