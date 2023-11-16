import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

interface SelectionProps {
    list: { key: string; value: string }[];
    current: string;
    change: (key: string) => void;
}

const Selection: React.FC<SelectionProps> = ({ list, current, change }) => (
    <View style={tw`mt-5 flex-1 rounded-md bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
        {list.map(({ key, value }, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    tw`ml-3 pr-3 pt-2 pb-2 flex-row justify-between border-midGray`,
                    index === list.length - 1 ? null : tw`border-b`,
                ]}
                onPress={() => {
                    change(key);
                }}
            >
                <Text style={tw`text-left text-base text-black dark:text-white`}>{value}</Text>
                {key === current && <Feather name="check" size={24} style={tw`text-midLight dark:text-midDark`} />}
            </TouchableOpacity>
        ))}
    </View>
);

export default Selection;
