import { StatusBar } from 'expo-status-bar';
import {Button, Text, View} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import tw from 'twrnc';

interface SplashScreenProps {
    navigation: NavigationProp<any>;
}

export default function SplashScreen({ navigation }: SplashScreenProps) {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-3xl font-bold uppercase`}>Methe</Text>
            <StatusBar style="auto" />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}
