import { StatusBar } from 'expo-status-bar';
import { Text, View, useColorScheme } from 'react-native';

import tw from 'twrnc';

export default function HomeScreen() {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>Welcome {useColorScheme()}</Text>
            <StatusBar style="auto" />
        </View>
    );
}
