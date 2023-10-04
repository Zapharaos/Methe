import {Text, SafeAreaView, Switch} from 'react-native';

import tw from '../../lib/tailwind';

export default function HomeScreen() {
    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-palePeach dark:bg-darkGrayBrown`}>
            <Text style={tw`text-black dark:text-white`}>Welcome !</Text>
        </SafeAreaView>
    );
}
