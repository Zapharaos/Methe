// Import necessary React components, libraries, and styles
import React from "react";
import { FlatList, I18nManager, Text, useWindowDimensions, View } from "react-native";
import tw from "@/lib/tailwind";

// Import custom components and interfaces
import CocktailCard from "@/src/components/cocktail/card";
import { Cocktail } from "@/src/utils/interface/CocktailInterface";

// Import context and constants
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import { IMAGE_WIDTH } from "@/src/constants/config";

// Define interface for CocktailsFlatlistProps
interface CocktailsFlatlistProps {
    cocktails: Cocktail[];                      // List of cocktails to display
    endReached?: () => void;                    // Callback when reaching the end of the list
    Footer?: React.FC;                          // Footer component
}

// CocktailsFlatlist functional component
export default function CocktailsFlatlist({ cocktails, endReached, Footer = () => <View />}: CocktailsFlatlistProps) {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    // Get window dimensions and calculate number of columns based on image width
    const { width } = useWindowDimensions();
    const columns = Math.floor(width / IMAGE_WIDTH);

    // NoCocktails component to display when there are no cocktails
    const NoCocktails = () => {
        return (
            <View style={tw`mt-3 flex-1 items-center`}>
                <Text style={tw`text-base text-midLight dark:text-midDark`}>
                    {i18n.t('noCocktails')}
                </Text>
            </View>
        )
    }

    // Render a FlatList of cocktails with specified configurations
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
