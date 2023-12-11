// Import necessary styles and components
import tw from '@/lib/tailwind';
import React from "react";
import { Text, Image, TouchableOpacity, View } from 'react-native';

// Import Expo components
import { Link } from 'expo-router';

// Define interface for CocktailCardProps
interface CocktailCardProps {
    id: string;       // Cocktail ID
    name: string;     // Cocktail name
    image: string;    // Image URL for the cocktail
}

// CocktailCard functional component
export default function CocktailCard({ id, name, image }: CocktailCardProps) {

    // Use the Link component to navigate to the cocktail details page
    return (
        <Link href={`/listing/${id}`} asChild>
            {/* TouchableOpacity for clickable card */}
            <TouchableOpacity style={tw`w-36 my-3 rounded-xl shadow-lg bg-palePeachSecond dark:bg-darkGrayBrownSecond`}>
                {/* Display cocktail image */}
                <Image style={tw`h-36 rounded-t-xl`} source={{ uri: image }} />
                {/* Container for text content */}
                <View style={tw`p-2 flex-auto items-center justify-center`}>
                    {/* Display cocktail name */}
                    <Text style={tw`text-center text-base text-black dark:text-white `}>
                        {name}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

