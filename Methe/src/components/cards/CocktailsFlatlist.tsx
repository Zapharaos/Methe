import React from "react";

import CocktailCard from "@/src/components/cards/CocktailCard";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";
import tw from "@/lib/tailwind";
import {FlatList, I18nManager, Text, View} from "react-native";
import {usePreferencesContext} from "@/src/contexts/preferences/preferences";

/**
 * The props of the CocktailsFlatlist
 */
interface CocktailsFlatlistProps {
    cocktails: Cocktail[];
    endReached?: () => void;
    Footer?: React.FC;
}

export default function CocktailsFlatlist({ cocktails, endReached, Footer }: CocktailsFlatlistProps) {

    const {
        i18n
    } = usePreferencesContext();

    const NoCocktails = () => {
        return (
            <View style={tw`flex-1`}>
                <Text style={tw`text-base text-midLight dark:text-midDark`}>
                    {i18n.t('noCocktails')}
                </Text>
            </View>
        )
    }

    const columns:number = 1;
    // columns depending on the width

    return (
        <FlatList
            data={cocktails}
            keyExtractor={item => item.cocktailId}
            renderItem={({item}) => <CocktailCard id={item.cocktailId} name={item.cocktailName} image={item.cocktailImage} />}
            ListEmptyComponent={<NoCocktails />}
            ListFooterComponent={Footer}
            ListFooterComponentStyle={tw`m-5 flex-1`}
            showsVerticalScrollIndicator={false}
            style={tw`p-3 bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}
            contentContainerStyle={columns > 1 ? undefined : tw`items-center`}
            columnWrapperStyle={columns > 1 ? tw`justify-around` : undefined}
            onEndReached={endReached}
            numColumns={columns}
        />
    );
}
