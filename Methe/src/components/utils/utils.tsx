import tw from '../../../lib/tailwind';

import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

/**
 * The porps of the IncrementDecrementNumber
 */
interface IncrementDecrementNumberProps {
    numberPerson: number;
    setNumberPerson: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * The component to print (- number +) and modify the number on client click
 * @param numberPerson a useState representing the number of person
 * @param setNumberPerson the setter of the number of person useState
 */
export function IncrementDecrementNumber({ numberPerson, setNumberPerson  }: IncrementDecrementNumberProps) {
    return (
        <View
            style={tw `flex-row items-center mx-4 border-gray-500 border rounded-full p-1 px-4`}>
            <TouchableOpacity onPress={() => setNumberPerson(prevState => {return prevState > 1 ? prevState - 1 : prevState})}>
                <AntDesign name="minus" size={20} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{color: '#fff', ...tw `font-extrabold text-lg mx-1`}}>{numberPerson}</Text>
            <TouchableOpacity onPress={() => setNumberPerson(prevState => {return prevState + 1})}>
                <AntDesign name="plus" size={20} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
}

/**
 * The porps of the LikeCocktail
 */
interface LikeCocktailProps {
    isLiked: boolean;
    clickOnLike: () => void;
}

/**
 * The component to print a heart and set up a click event
 * @param isLiked a useState representing if the cocktail is liked
 * @param clickOnLike a function to modify the like list
 */
export function LikeCocktail ({ isLiked, clickOnLike  }: LikeCocktailProps) {

    return (
        <TouchableOpacity onPress={clickOnLike} style={tw `absolute top-0 right-0 m-1 mr-3 p-2 w-10 h-10 bg-white rounded-full items-center justify-center`}>
            {!isLiked && <MaterialIcons name="favorite-outline" size={24} color="black" />}
            {isLiked && <MaterialIcons name="favorite" size={24} color="black" />}
        </TouchableOpacity>
    );
}
