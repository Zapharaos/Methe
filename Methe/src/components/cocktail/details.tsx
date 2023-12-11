// Import necessary React and React Native components, libraries, and styles
import React, { useEffect, useState } from 'react';
import { Dimensions, I18nManager, Share, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import tw from '@/lib/tailwind';

// Import context and utility functions
import { useFavoritesContext } from "@/src/contexts/favorites";
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";

// Import constants and components
import { IMAGE_HEIGHT } from "@/src/constants/config";
import { Display } from "@/src/utils/enums/utils";
import Loader from "@/src/components/loader";
import Header from "@/src/components/header/header";
import { CocktailDetail } from "@/src/utils/interface/CocktailInterface";
import { extractUrlFromCocktail, getCocktailDetailsById, getRandomCocktailDetails } from "@/src/utils/cocktail";
import HeaderButton from "@/src/components/header/button";
import IngredientsGrid from "@/src/components/ingredients/grid";
import IngredientsList from "@/src/components/ingredients/list";

// Get window width
const { width } = Dimensions.get('window');

// Interface for CocktailDetailsProps
interface CocktailDetailsProps {
    id: string;                       // Cocktail ID
    headerPushBack?: boolean;         // Flag for pushing back on the header
}

// CocktailDetails functional component
export default function CocktailDetails({ id, headerPushBack = false}: CocktailDetailsProps) {

    // Retrieve the app's preferences from context
    const { i18n } = usePreferencesContext();

    // Retrieve favorites-related functions and state from context
    const { isFavorite, toggleFavorite } = useFavoritesContext();

    // State variables for cocktail details, units, ingredients display, and loading state
    const [cocktail, setCocktail] = useState<CocktailDetail>();
    const [units, setUnits] = useState<number>(1);
    const [ingredientsDisplay, setIngredientsDisplay] = useState(Display.Grid);
    const [loading, setLoading] = useState(true);

    // Initialize router from Expo Router
    const router = useRouter();

    // Create animated refs and styles for image and header animations
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    // Animated styles for image : scaling and translation
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

    // Animated styles for header : opacity
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
        };
    }, []);

    // Native share function
    const share = async () => {
        try {
            await Share.share({
                message: i18n.t('share'),
                url: extractUrlFromCocktail(cocktail),
            })
        } catch (err) {
            console.log(err);
        }
    }

    // Change ingredients display function
    const changeIngredientsDisplay = (display: Display) => {
        setIngredientsDisplay(display);
        scrollOffset.value = 0; // when the display changes, so does the height but not the scrollOffset value = reset
    };

    // Fetch another random cocktail
    const getAnotherCocktail = () => {
        setLoading(true);
        const fetchCocktail = async () => {
            const cocktail = await getRandomCocktailDetails();
            setCocktail(cocktail);
            setLoading(false);
        };
        fetchCocktail();
    }

    // ExtendedHeader component
    const ExtendedHeader = () => {
        return (
            <Header>
                {/* Background */}
                <Animated.View style={[headerAnimatedStyle, tw`absolute w-full h-full bg-palePeachSecond dark:bg-darkGrayBrownSecond`]}/>

                {/* Left */}
                <View style={tw`p-2`}>
                    {headerPushBack ? (
                        <HeaderButton onPress={router.back} iconComponent1={<Ionicons/>} iconName1={"chevron-back"}/>
                    ) : (
                        <HeaderButton onPress={getAnotherCocktail} iconComponent1={<FontAwesome/>} iconName1={"refresh"}/>
                    )}
                </View>

                {/* Right */}
                {cocktail && (
                    <View style={tw`p-2 flex-row items-center justify-center gap-5`}>
                        {/* Share */}
                        <HeaderButton onPress={share} iconComponent1={<Feather/>} iconName1={"share"}/>
                        {/* Favorite */}
                        <HeaderButton onPress={() => toggleFavorite(cocktail.cocktailId)} iconComponent1={<MaterialIcons/>} iconName1={"favorite-outline"}
                            iconComponent2={<MaterialIcons/>} iconName2={"favorite"} useSecondIcon={isFavorite(cocktail.cocktailId)}
                        />
                    </View>
                )}
            </Header>
        );
    }

    // Base component
    const Base = ({ children }: { children: React.ReactNode }) => {
        return (
            <View style={tw`flex-1 bg-palePeach dark:bg-darkGrayBrown ${I18nManager.isRTL ? 'direction-rtl' : ''}`}>
                <Stack.Screen
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                        header: () => <ExtendedHeader/>,
                    }}
                />
                <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                    {children}
                </Animated.ScrollView>
            </View>
        )
    }

    // Fetch cocktail details on component mount
    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktail = await getCocktailDetailsById(id);
            setCocktail(cocktail);
            setLoading(false);
        };
        fetchCocktail();
    }, []);

    // Loading state
    if(loading) {
        return (
            <Base>
                <Loader/>
            </Base>
        )
    }

    // No cocktail found state
    if(!cocktail) {
        return (
            <Base>
                <Text>
                    {i18n.t("noCocktail")}
                </Text>
            </Base>
        )
    }

    // Cocktail details state
    return (
        <Base>
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
                <View style={tw`mt-5 flex-row justify-around items-stretch`}>
                    {/* Alcoholic */}
                    <View style={tw`p-3 max-w-1/3 justify-center rounded-full bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                        <Text style={tw`text-center text-darkGrayBrown dark:text-palePeach`}>
                            {cocktail.strAlcoholic}
                        </Text>
                    </View>
                    {/* Category */}
                    <View style={tw`p-3 max-w-1/3 justify-center rounded-full bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                        <Text style={tw`text-center text-darkGrayBrown dark:text-palePeach`}>
                            {cocktail.strCategory}
                        </Text>
                    </View>
                    {/* Glass */}
                    <View style={tw`p-3 max-w-1/3 justify-center rounded-full bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                        <Text style={tw`text-center text-darkGrayBrown dark:text-palePeach`}>
                            {cocktail.strGlass}
                        </Text>
                    </View>
                </View>

                {/* Instructions */}
                <View style={tw`mt-5`}>
                    <Text style={tw`font-bold text-xl text-black dark:text-white`}>
                        {i18n.t('cocktail.instructions')}
                    </Text>
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
                            <Text style={tw`mx-5 font-extrabold text-base text-darkGrayBrown dark:text-palePeach`}>
                                {units} {i18n.t('cocktail.units')}
                            </Text>
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
                    {ingredientsDisplay === Display.Grid ? (
                        <IngredientsGrid ingredients={cocktail.ingredientList} units={units}/>
                    ) : (
                        <IngredientsList ingredients={cocktail.ingredientList} units={units}/>
                    )}
                </View>
            </View>
        </Base>
    );
};
