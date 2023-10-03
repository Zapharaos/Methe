import {Text, SafeAreaView, useColorScheme} from 'react-native';

import tw from 'twrnc';

export default function HomeScreen() {
    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center`}>
            <Text>Welcome !</Text>
            <Text>useColorScheme = {useColorScheme()}</Text>
        </SafeAreaView>
    );
}
