import React, {useEffect, useState} from 'react';
import {Dimensions, I18nManager, Share, Text, TouchableOpacity, View} from 'react-native';
import tw from '@/lib/tailwind';
import {CocktailDetail} from "@/src/utils/interface/CocktailInterface";
import {extractUrlFromCocktail, getCocktailDetailsById} from "@/src/utils/cocktail";
import {Stack, useRouter} from "expo-router";
import {useFavoritesContext} from "@/src/contexts/favorites";
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset} from "react-native-reanimated";
import {AntDesign, Entypo, Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {IMAGE_HEIGHT} from "@/src/constants/config";
import IngredientsContainerCards from "@/src/components/cards/IngredientsContainerCards";
import {usePreferencesContext} from "@/src/contexts/preferences/preferences";
import {Display} from "@/src/utils/enums/utils";

const {width} = Dimensions.get('window');

interface CocktailComponentProps {
    id: string;
    headerPushBack?: boolean;
}

export default function CocktailComponent({ id, headerPushBack = false}: CocktailComponentProps) {

    const {
        i18n
    } = usePreferencesContext();

    const {
        isFavorite,
        toggleFavorite
    } = useFavoritesContext();

    const [cocktail, setCocktail] = useState<CocktailDetail>();
    const [units, setUnits] = useState<number>(1);
    const [ingredientsDisplay, setIngredientsDisplay] = useState(Display.Grid);

    const router = useRouter();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktail = await getCocktailDetailsById(id);
            setCocktail(cocktail);
        };
        fetchCocktail();
    }, []);

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

    const Header = () => {
        return (
            <>
                <View style={tw`h-24 flex-row items-end justify-between`}>

                    {/* Background */}
                    <Animated.View style={[headerAnimatedStyle, tw`absolute w-full h-full bg-palePeachSecond dark:bg-darkGrayBrownSecond`]}/>

                    {/* Left */}
                    <View style={tw`p-2`}>
                        {headerPushBack && (
                            <TouchableOpacity
                                onPress={router.back}
                                style={tw`w-10 h-10 rounded-full border border-palePeach dark:border-darkGrayBrown bg-darkGrayBrown dark:bg-palePeach items-center justify-center`}
                            >
                                <Ionicons name="chevron-back" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Right */}
                    <View style={tw`p-2 flex-row items-center justify-center gap-5`}>

                        {/* Share */}
                        <TouchableOpacity
                            onPress={share}
                            style={tw`w-10 h-10 rounded-full border border-palePeach dark:border-darkGrayBrown bg-darkGrayBrown dark:bg-palePeach items-center justify-center`}
                        >
                            <Feather name="share" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                        </TouchableOpacity>

                        {/* Favorite */}
                        {cocktail && (
                            <TouchableOpacity
                                onPress={() => toggleFavorite(cocktail.cocktailId)}
                                style={tw`w-10 h-10 rounded-full border border-palePeach dark:border-darkGrayBrown bg-darkGrayBrown dark:bg-palePeach items-center justify-center`}
                            >
                                {!isFavorite(cocktail.cocktailId) && (
                                    <MaterialIcons
                                        name="favorite-outline"
                                        size={24}
                                        style={tw`text-palePeach dark:text-darkGrayBrown`}
                                    />
                                )}
                                {isFavorite(cocktail.cocktailId) && (
                                    <MaterialIcons name="favorite" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </>
        );
    }

    const changeIngredientsDisplay = (display: Display) => {
        setIngredientsDisplay(display);
    };

    return (
        <View style={tw`flex-1 bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    header: () => <Header/>,
                }}
            />
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                {cocktail &&
                    <View>
                        {/* Image */}
                        <Animated.Image
                            source={{ uri: cocktail.cocktailImage }}
                            style={[{width: width, height: IMAGE_HEIGHT}, imageAnimatedStyle]}
                            resizeMode="cover"
                        />
                        {/* Details */}
                        <View style={tw`p-5 bg-palePeach dark:bg-darkGrayBrown`}>

                            {/* Title */}
                            <Text style={tw`text-3xl font-semibold text-black dark:text-white`}>
                                {cocktail.cocktailName}
                            </Text>

                            {/* Categories */}
                            <View style={tw`mt-5 flex-row justify-between`}>
                                <View style={tw`p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                    <Text style={tw`text-black dark:text-white`}> {cocktail.strAlcoholic} </Text>
                                </View>
                                <View style={tw`p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                    <Text style={tw`text-black dark:text-white`}>
                                        {cocktail.strCategory}
                                    </Text>
                                </View>
                                <View style={tw`p-3 rounded-full bg-stone-800 max-w-1/3`}>
                                    <Text style={tw`text-black dark:text-white`}>
                                        {cocktail.strGlass}
                                    </Text>
                                </View>
                            </View>

                            {/* About */}
                            <View style={tw`mt-5`}>
                                <Text style={tw`font-bold text-xl text-black dark:text-white`}>{i18n.t('cocktail.about')}</Text>
                                <Text style={tw`mt-2 text-justify text-base text-black dark:text-white`}>
                                    {cocktail.strInstructions}
                                </Text>
                            </View>

                            {/* Ingredients */}
                            <View style={tw`mt-5`}>

                                <Text style={tw`font-bold text-xl text-black dark:text-white`}>
                                    {i18n.t('cocktail.ingredients')}
                                </Text>

                                {/* Properties */}
                                <View style={tw`mt-2 flex-row justify-between items-center`}>

                                    {/* Units */}
                                    <View style={tw`p-1 px-4 flex-row items-center rounded-xl bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                                        <TouchableOpacity onPress={() => setUnits(prevState => {return prevState > 1 ? prevState - 1 : prevState})}>
                                            <AntDesign name="minus" size={24} style={tw`text-darkGrayBrown dark:text-palePeach`} />
                                        </TouchableOpacity>
                                        <Text style={tw`mx-5 font-extrabold text-lg text-darkGrayBrown dark:text-palePeach`}>{units} {i18n.t('cocktail.units')}</Text>
                                        <TouchableOpacity onPress={() => setUnits(prevState => {return prevState + 1})}>
                                            <AntDesign name="plus" size={24} style={tw`text-darkGrayBrown dark:text-palePeach`} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Display */}
                                    <View style={tw`flex-row gap-3`}>
                                        <TouchableOpacity onPress={() => changeIngredientsDisplay(Display.Grid)}>
                                            <Entypo name="grid" size={32} style={tw`${ingredientsDisplay === Display.Grid ? 'text-darkGrayBrown dark:text-palePeach' : 'text-midDark dark:text-midLight'}`} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => changeIngredientsDisplay(Display.List)}>
                                            <Entypo name="list" size={32} style={tw`${ingredientsDisplay === Display.List ? 'text-darkGrayBrown dark:text-palePeach' : 'text-midDark dark:text-midLight'}`} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Listing */}
                                {ingredientsDisplay === Display.Grid &&
                                    <View>
                                        <Text>{Display.Grid}</Text>
                                    </View>
                                }
                                {ingredientsDisplay === Display.List &&
                                    <View>
                                        <Text>{Display.List}</Text>
                                    </View>
                                }
                                <IngredientsContainerCards ingredientList={cocktail.ingredientList} numberPerson={units}/>
                            </View>
                        </View>
                    </View>
                }
                {!cocktail &&
                    <View>
                        <Text>Error</Text>
                    </View>
                }
            </Animated.ScrollView>
        </View>
    );
};
