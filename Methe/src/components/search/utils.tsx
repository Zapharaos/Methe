// Import necessary components and styles from React Native and external libraries
import { Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import tw from "@/lib/tailwind";
import React, {Dispatch, SetStateAction, useState} from "react";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming, useAnimatedRef, measure, runOnUI,
} from 'react-native-reanimated';

import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import ListingOptions, {ListingOptionsProps} from "@/src/components/listingOptions";

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

// Interface for the props of the SearchBar component
interface SearchItemProps {
    children: React.ReactNode;
    isActive: boolean;
    title: string;
    onPress: () => void;
    style?: ViewStyle;
}

// Component for rendering a search item container
export const SearchItem = ({ children, isActive, title, onPress, style }: SearchItemProps) => {
    return (
        <View style={[tw`rounded-2xl bg-palePeachSecond dark:bg-darkGrayBrownSecond ${isActive ? '' : 'p-5 '}`, style]}>
            { isActive ? (
                <TouchableOpacity onPress={onPress} style={tw`p-5`}>
                    <SearchItemTitle label={title} />
                </TouchableOpacity>
            ) : (
                <SearchItemTitle label={title} />
            )}

            { !isActive &&
                children
            }
        </View>
    );
};


// Interface for the props of the SearchBar component
interface SearchBarProps {
    searchedValue: string;
    setSearchedValue: Dispatch<SetStateAction<string>>;
    onCancel: () => void;
}

// Component for rendering a search bar
export const SearchBar = ({ searchedValue, setSearchedValue, onCancel }: SearchBarProps) => {

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
                <TouchableOpacity style={tw`rounded-full p-2`} onPress={onCancel}>
                    <MaterialIcons name="cancel" size={24} style={tw`text-midGray`} />
                </TouchableOpacity>
            }
        </View>
    );
};

// Interface for the props of the SearchBar component
interface FilterItemProps {
    label: string;
    listingProps: ListingOptionsProps;
}

// Component for rendering a search bar
export const FilterItem = ({ label, listingProps }: FilterItemProps) => {

    const {i18n} = usePreferencesContext();

    const [accordion, setAccordion] = useState(false);
    const accordionRef = useAnimatedRef<Animated.View>();
    const accordionHeight = useSharedValue(0);
    const accordionAnimation = useAnimatedStyle(() => ({
        height: accordionHeight.value,
    }));

    const toggleAccordion = () => {
        if (accordion) {
            accordionHeight.value = withTiming(0);
        } else {
            runOnUI(() => {
                'worklet'; // Indicates that should run on the UI thread = better perf
                accordionHeight.value = withTiming(measure(accordionRef)!.height);
            })();
        }
        setAccordion(!accordion);
    };

    return (
        <View style={tw`border border-midGray my-3 rounded-lg overflow-hidden`}>
            <TouchableOpacity style={tw`flex-row justify-between p-5`} onPress={toggleAccordion}>
                <Text style={tw`text-base font-semibold text-darkGrayBrown dark:text-palePeach`}>
                    {i18n.t(label)}
                </Text>
                <AntDesign name={accordion ? 'up' : 'down'} size={24} style={tw`text-midGray`} />
            </TouchableOpacity>
            <Animated.View style={accordionAnimation}>
                <Animated.View ref={accordionRef} style={tw`w-full absolute`}>
                    <ListingOptions
                        list={listingProps.list}
                        change={listingProps.change}
                        current={listingProps.current}
                        style={tw`mx-5 mb-5`}
                    />
                </Animated.View>
            </Animated.View>
        </View>
    );
};
