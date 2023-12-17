// Import necessary React and React Native components and styles
import React, {useState} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "@/lib/tailwind";
import {set} from "i18n-js/typings/lodash";

// Define the props interface for the SettingsItem component
interface SettingsItemProp {
    label: string;          // Label for the setting
    value: string;          // Value for the setting
    isLast: boolean;        // Flag indicating if the setting is the last in the list
    SettingsModal: React.FC<any>; // Modal content component
}

// Define the SettingsItem functional component
const SettingsItem: React.FC<SettingsItemProp>  = ({label, value, SettingsModal, isLast}) => {

    const [visible, setVisible] = useState(false);

    return (
        <>
            <SettingsModal visible={visible} setVisible={setVisible} />
            <TouchableOpacity
                style={tw`ml-3 pr-3 pt-2 pb-2 flex-row justify-between border-midGray ${isLast ? '' : 'border-b'}`}
                onPress={() => setVisible(true)}
            >
                {/* Label text for the setting */}
                <Text style={tw`mb-1 text-left text-base text-black dark:text-white`}>
                    {label}
                </Text>
                {/* Container for the setting value and right arrow icon */}
                <View style={tw`flex-row items-center`}>
                    {/* Text displaying the setting value */}
                    <Text style={tw`mr-3 text-midLight dark:text-midDark`}>
                        {value}
                    </Text>
                    {/* Right arrow icon indicating that the setting is clickable */}
                    <AntDesign name="right" size={18} style={tw`text-midLight dark:text-midDark`} />
                </View>
            </TouchableOpacity>
        </>
    );
}

export default SettingsItem;
