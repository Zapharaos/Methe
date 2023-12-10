import React from "react";
import {ActivityIndicator, View} from "react-native";
import tw from "@/lib/tailwind";

import BaseComponent from "@/src/components/base";

const Colors = require('@/src/constants/colors');

export default function Loader() {

    return (
        <BaseComponent>
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color={Colors.midGray}/>
            </View>
        </BaseComponent>
    );
}

