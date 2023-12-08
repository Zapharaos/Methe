import tw from '@/lib/tailwind';

import React from "react";
import { Text, Image, TouchableOpacity, View} from 'react-native';

import { Link } from 'expo-router';
import { CocktailFavoriteStatus } from "@/src/components/utils/utils";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {getIngredientMeasure} from "@/src/utils/cocktail";

/**
 * The props of the CocktailCards
 */
interface CocktailCardProps {
    id: string;
    name: string;
    image: string;
}

export default function CocktailCard({ id, name, image }: CocktailCardProps) {

    return (
        <Link href={`/listing/${id}`} asChild>
            <TouchableOpacity style={tw`w-36 my-3 rounded-xl bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                <Image style={tw`h-36 rounded-t-xl`} source={{ uri: image }} />
                <View style={tw`p-2 flex-auto items-center justify-center`}>
                    <Text style={tw`text-center text-base text-black dark:text-white `}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

