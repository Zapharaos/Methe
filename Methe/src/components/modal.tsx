// Import necessary components and styles from React Native and external libraries
import React, {Dispatch, SetStateAction, useState} from "react";
import {View, Modal, Text} from "react-native";
import tw from "@/lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";

// Import context and utility functions
import BaseComponent from "@/src/components/base";
import HeaderButton from "@/src/components/header/button";

// Interface for the props of the Modal component
interface ModalProps {
    children: React.ReactNode;
    title: string;
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

// Main component for the search modal
const ModalComponent: React.FC<ModalProps> = ({ children, title, visible, setVisible } : ModalProps) => {

    return (
        <Modal animationType="slide" visible={visible}>
            <BaseComponent>
                <View style={tw`w-full flex-1 flex-col gap-5`}>
                    {/* Header */}
                    <View style={tw`h-14 items-center justify-center`}>
                        <HeaderButton onPress={() => setVisible(false)} iconComponent1={<MaterialIcons/>} iconName1={"close"} buttonStyle={tw`ml-3 mr-auto`}/>
                        <Text style={tw`absolute text-xl text-black dark:text-white`}>
                            {title}
                        </Text>
                    </View>
                    {children}
                </View>
            </BaseComponent>
        </Modal>
    );
}

export default ModalComponent;

