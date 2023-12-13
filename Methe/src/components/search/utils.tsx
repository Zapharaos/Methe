// Import necessary components and styles from React Native and external libraries
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import tw from "@/lib/tailwind";
import React, { Dispatch, SetStateAction } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

// Import Colors constant for setting the placeholder color
const Colors = require('@/src/constants/colors');

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
    searchedValue: string;
    setSearchedValue: Dispatch<SetStateAction<string>>;
}

// Component for rendering a search bar
export const SearchBar = ({ searchedValue, setSearchedValue }: SearchBarProps) => {

    const {i18n} = usePreferencesContext();

    return (
        <View style={tw`flex-row items-center rounded-xl mt-3 px-2 border border-midGray`}>

            {/* Search icon */}
            <Entypo name="magnifying-glass" size={24} style={tw`text-midGray`} />

            {/* TextInput for entering search queries */}
            <TextInput
                placeholder={i18n.t('search.buttonSearch')}
                placeholderTextColor={Colors.midGray}
                style={tw`p-2 flex-1 text-base text-black dark:text-white placeholder:text-midGray`}
                onChangeText={setSearchedValue}
                value={searchedValue}
                textAlignVertical="center"
            />

            {/* Button to clear the search query */}
            {searchedValue &&
                <TouchableOpacity style={tw`rounded-full p-2`} onPress={() => setSearchedValue('')}>
                    <MaterialIcons name="cancel" size={24} style={tw`text-midGray`} />
                </TouchableOpacity>
            }
        </View>
    );
};
