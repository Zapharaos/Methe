import React from 'react';
import {View} from 'react-native';
import tw from '@/lib/tailwind';
import {useHeaderHeight} from "@react-navigation/elements";

const ModalComponent = ({ children }: { children: React.ReactNode }) => {
    const headerHeight = useHeaderHeight();
    return (
        <View style={[{ paddingTop: headerHeight }, tw`flex-1 items-center bg-palePeach dark:bg-darkGrayBrown`]}>
            <View style={tw`w-11/12`}>
                {children}
            </View>
        </View>
    );
};

export default ModalComponent;
