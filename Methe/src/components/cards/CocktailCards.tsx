import tw from '../../../lib/tailwind';

import {Button, Text, Image, TouchableOpacity, View} from 'react-native';
import {usePreferencesContext} from "../../contexts/preferences/preferences";
import {NavigationProp} from "@react-navigation/native";

interface CocktailCardsProps {
    navigation: NavigationProp<any>;
    cocktailId: bigint;
    cocktailNames: string;
    cocktailImage: string;
}

export default function CocktailCards({ navigation, cocktailId, cocktailNames, cocktailImage }: CocktailCardsProps) {

    const { i18n} = usePreferencesContext();

    const openCocktailDetail = () => {
        navigation.navigate('CocktailPage', {cocktailId: cocktailId })
    }

    return (
        <TouchableOpacity onPress={openCocktailDetail}>
            <View style={tw `mt-5`}>
                <Image style={tw `mt-5`} source={{ uri: cocktailImage }}/>
                <Button title={'test'}></Button>
                <Text style={tw `mt-5`}>{cocktailNames}</Text>
            </View>
        </TouchableOpacity>
    );
}
