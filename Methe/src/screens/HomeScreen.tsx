import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import tw from 'twrnc';

export default function HomeScreen() {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>Welcome</Text>
            <StatusBar style="auto" />
        </View>
    );
}
