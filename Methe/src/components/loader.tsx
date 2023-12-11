// Import necessary React and React Native components and styles
import React from "react";
import { ActivityIndicator, View } from "react-native";
import tw from "@/lib/tailwind";

// Import the BaseComponent for structuring the loader
import BaseComponent from "@/src/components/base";

// Import Colors constant for setting the loading animation color
const Colors = require('@/src/constants/colors');

// Loader component for displaying a loading animation
export default function Loader() {

    return (
        <BaseComponent>
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.midGray}/>
            </View>
        </BaseComponent>
    );
}

