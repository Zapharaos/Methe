import {Text, TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import tw from "@/lib/tailwind";
import React, {Dispatch, SetStateAction} from "react";
import {Entypo, MaterialIcons} from "@expo/vector-icons";

export const ResearchItemTitle = ({ label }: { label: string}) => {
    return (
        <Text style={tw`text-base font-semibold text-darkGrayBrown dark:text-palePeach`}>
            {label}
        </Text>
    )
}

export const ResearchItem = ({ children, style }: { children: React.ReactNode, style?: ViewStyle;}) => {
    return (
        <View style={[tw`rounded-2xl p-5 bg-palePeachSecond dark:bg-darkGrayBrownSecond`, style]}>
            {children}
        </View>
    )
}

export const ResearchClickableItem = ({ onPress, label }: { onPress: () => void, label: string}) => {
    return (
        <ResearchItem style={tw`p-0`}>
            <TouchableOpacity onPress={onPress} style={tw`p-5`}>
                <ResearchItemTitle label={label}/>
            </TouchableOpacity>
        </ResearchItem>
    )
}

interface ResearchBarProps {
    fetchResearch: () => void,
    searchedValue: string,
    setSearchedValue: Dispatch<SetStateAction<string>>,
}

export const ResearchBar = ({ fetchResearch, searchedValue, setSearchedValue }: ResearchBarProps) => {
    return (
        <View style={tw `mx-5 mb-5 flex-row items-center rounded-full p-1 bg-gray-900`}>
            <TouchableOpacity onPress={fetchResearch}
                              style={tw `rounded-full p-2 bg-stone-800 ml-1`}>
                <Entypo name="magnifying-glass" size={24} color="white" />
            </TouchableOpacity>

            <TextInput  placeholder='Search'  style={tw `p-4 flex-1 font-semibold text-white`}
                        onChangeText={setSearchedValue}
                        value={searchedValue}
                        onEndEditing={fetchResearch}
            />
            { searchedValue && <TouchableOpacity
                style={tw `rounded-full p-2 mr-1`}
                onPress={() => setSearchedValue('')}>
                <MaterialIcons name="cancel" size={24} color="white" />
            </TouchableOpacity>}
        </View>
    )
}
