import tw from '../../lib/tailwind';

import {Button, Text, View} from 'react-native';
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {NavigationProp} from "@react-navigation/native";

interface SplashScreenProps {
    navigation: NavigationProp<any>;
}

export default function HomeScreen({ navigation }: SplashScreenProps) {

    const { i18n} = usePreferencesContext();

    const toSett = () => {
        navigation.navigate('Settings')
    }

    return (
        <BaseComponent>
            <Text style={tw`text-black dark:text-white`}>{i18n.t('welcome')}</Text>
            <Button title="Settings" onPress={ () => { navigation.navigate('Settings')} } />
        </BaseComponent>
    );
}
