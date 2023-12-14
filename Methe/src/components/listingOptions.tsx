// Import necessary React and React Native components and styles
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

// Define the props interface for the ListingOptions component
interface ListingOptionsProps {
    list: { key: string; value: string }[] | string[]; // List of items with keys and values
    current: string | string[];                        // Current selection key
    change: (key: string) => void;                     // Function to be called on selection change
}

// Define the ListingOptions functional component
const ListingOptions: React.FC<ListingOptionsProps> = ({ list, current, change }) => {

    const currentList = Array.isArray(current) ? current : [current];

    return (
        <View style={tw`mt-5 rounded-md bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
            {/* Iterate over the list and render a TouchableOpacity for each item */}
            {list.map((item, index) => {

                // Set variables based on the type of the item
                const key = typeof item === 'string' ? item : item.key;
                const value = typeof item === 'string' ? item : item.value;

                return (
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
                        {currentList.includes(key) && <Feather name="check" size={24} style={tw`text-midLight dark:text-midDark`} />}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ListingOptions;
