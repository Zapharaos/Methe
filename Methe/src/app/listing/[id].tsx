import React, {useEffect, useLayoutEffect, useState} from "react";
import {Text, TouchableOpacity, View, Share, I18nManager, Dimensions} from 'react-native';
import {useLocalSearchParams, useRouter, useNavigation} from "expo-router";
import {Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from 'react-native-reanimated'

import { CocktailDetail } from "@/src/utils/interface/CocktailInterface";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {extractUrlFromCocktail, getCocktailDetailsById} from "@/src/utils/cocktail";

import {IMAGE_HEIGHT} from "@/src/constants/config";
import IngredientsContainerCards from "@/src/components/cards/IngredientsContainerCards";
import {IncrementDecrementNumber} from "@/src/components/utils/utils";

interface CocktailDetailScreenProps {
    cocktailId: string;
}

const {width} = Dimensions.get('window');

const CocktailDetailScreen: React.FC<CocktailDetailScreenProps> = ({ cocktailId }) => {

    const {
        favorites,
        isFavorite,
        toggleFavorite
    } = useFavoritesContext();

    /**
     * The cocktailId of the cocktail
     */
    const {id} = useLocalSearchParams();

    /**
     * The cocktail to present
     */
    const [cocktail, setCocktail] = useState<CocktailDetail>();

    /**
     * The number of person for the ingredients measures
     */
    const [numberPerson, setNumberPerson] = useState<number>(1);

    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktail = await getCocktailDetailsById(id?.toString() ?? cocktailId);
            setCocktail(cocktail);
        };
        fetchCocktail();
    }, []);

    const share = async () => {
        if(cocktail) {
            try {
                await Share.share({
                    message: "Hey ! Check this drink out !",
                    url: extractUrlFromCocktail(cocktail),
                })
            } catch (err) {
                console.log(err);
            }
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTransparent: true,

            headerBackground: () => (
                <Animated.View style={[headerAnimatedStyle, tw`h-28 bg-palePeach dark:bg-darkGrayBrown`]}></Animated.View>
            ),
            headerRight: () => (
                <View style={tw`flex-row items-center justify-center gap-5`}>
                    <TouchableOpacity onPress={share} style={tw`w-10 h-10 rounded-full bg-darkGrayBrown dark:bg-palePeach items-center justify-center`}>
                        <Feather name="share" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`}/>
                    </TouchableOpacity>
                    { cocktail && <TouchableOpacity onPress={() => toggleFavorite(cocktail.cocktailId)} style={tw`w-10 h-10 rounded-full bg-darkGrayBrown dark:bg-palePeach items-center justify-center`}>
                        {!isFavorite(cocktail.cocktailId) && <MaterialIcons name="favorite-outline" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />}
                        {isFavorite(cocktail.cocktailId) && <MaterialIcons name="favorite" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />}
                    </TouchableOpacity>}
                </View>
            ),
            headerLeft: () => (
                <View>
                    { id && <TouchableOpacity onPress={router.back} style={tw`w-10 h-10 rounded-full bg-darkGrayBrown dark:bg-palePeach items-center justify-center`}>
                        <Ionicons name="chevron-back" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`}/>
                    </TouchableOpacity>}
                </View>
            )
        })
    }, [cocktail, favorites]);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT, IMAGE_HEIGHT],
                        [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
        };
    }, []);

    return (
        <View style={tw`flex-1 bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                {cocktail &&
                    <Animated.Image
                        source={{ uri: cocktail.cocktailImage }}
                        style={[{width: width, height: IMAGE_HEIGHT}, imageAnimatedStyle]}
                        resizeMode="cover"
                    />
                }
                {cocktail &&
                    <View style={tw`p-6 bg-palePeach dark:bg-darkGrayBrown`}>
                        <View style={ tw `mx-5 mt-2 flex-row justify-between items-center`}>
                            <Text style={ tw `text-white text-3xl font-semibold`}>
                                {cocktail.cocktailName}
                            </Text>
                        </View>
                        {/* Quick information about the cocktail */}
                        <View style={ tw `mt-3 flex-row justify-between`}>
                            <View
                                style={ tw `p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                <Text style={tw `text-white`}> {cocktail.strAlcoholic} </Text>
                            </View>
                            <View
                                style={ tw `p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                <Text style={tw `text-white`}> {cocktail.strCategory} </Text>
                            </View>
                            <View
                                style={ tw `p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                <Text style={tw `text-white`}> {cocktail.strGlass} </Text>
                            </View>
                        </View>

                        <View style={ tw `mx-5 mt-2`}>
                            <Text style={tw `text-white text-lg font-bold`}>About</Text>
                            <Text style={tw `text-white mt-2`}>
                                {cocktail.strInstructions}
                            </Text>
                        </View>

                        <View>
                            <View style={ tw `m-5`}>
                                <Text style={tw `text-white text-lg font-bold`}>Les Ingrédients</Text>

                                <View style={ tw `ml-5 flex-row justify-between items-center`}>
                                    <View style={ tw `flex-row items-center`}>
                                        <Text style={ tw `text-base text-white font-semibold opacity-60`}>
                                            Le nombre de personne
                                        </Text>
                                    </View>

                                    {/* PlusMoinsNombre */}
                                    <IncrementDecrementNumber
                                        numberPerson={numberPerson}
                                        setNumberPerson={setNumberPerson}/>
                                </View>
                            </View>
                            <IngredientsContainerCards ingredientList={cocktail.ingredientList} numberPerson={numberPerson}/>
                        </View>
                    </View>
                }
            </Animated.ScrollView>
        </View>
    );
}

export default CocktailDetailScreen;

