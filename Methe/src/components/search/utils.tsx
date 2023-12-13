// Import necessary components and styles from React Native and external libraries
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import tw from "@/lib/tailwind";
import React, { Dispatch, SetStateAction } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

// Component for rendering a search item title
export const SearchItemTitle = ({ label }: { label: string }) => {
    return (
        <Text style={tw`text-base font-semibold text-darkGrayBrown dark:text-palePeach`}>
            {label}
        </Text>
    );
};

// Component for rendering a search item container
export const SearchItem = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
    return (
        <View style={[tw`rounded-2xl p-5 bg-palePeachSecond dark:bg-darkGrayBrownSecond`, style]}>
            {children}
        </View>
    );
};

// Component for rendering a clickable search item
export const SearchClickableItem = ({ onPress, label }: { onPress: () => void; label: string }) => {
    return (
        <SearchItem style={tw`p-0`}>
            <TouchableOpacity onPress={onPress} style={tw`p-5`}>
                <SearchItemTitle label={label} />
            </TouchableOpacity>
        </SearchItem>
    );
};

// Interface for the props of the SearchBar component
interface SearchBarProps {
    fetchSearch: () => void;
    searchedValue: string;
    setSearchedValue: Dispatch<SetStateAction<string>>;
}

// Component for rendering a search bar
export const SearchBar = ({ fetchSearch, searchedValue, setSearchedValue }: SearchBarProps) => {
    return (
        <View style={tw`mx-5 mb-5 flex-row items-center rounded-full p-1 bg-gray-900`}>
            {/* Button to trigger the search */}
            <TouchableOpacity onPress={fetchSearch} style={tw`rounded-full p-2 bg-stone-800 ml-1`}>
                <Entypo name="magnifying-glass" size={24} color="white" />
            </TouchableOpacity>

            {/* TextInput for entering search queries */}
            <TextInput
                placeholder='Search'
                style={tw`p-4 flex-1 font-semibold text-white`}
                onChangeText={setSearchedValue}
                value={searchedValue}
                onEndEditing={fetchSearch}
            />

            {/* Button to clear the search query */}
            {searchedValue &&
                <TouchableOpacity
                    style={tw`rounded-full p-2 mr-1`}
                    onPress={() => setSearchedValue('')}>
                    <MaterialIcons name="cancel" size={24} color="white" />
                </TouchableOpacity>
            }
        </View>
    );
};
