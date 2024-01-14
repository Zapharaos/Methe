// Import necessary React and React Native components and styles
import React from 'react';
import {MaterialIcons} from "@expo/vector-icons";
import HeaderButton from "@/src/components/header/button";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {CocktailDetail} from "@/src/utils/interface/CocktailInterface";

// HeaderButton component definition
const HeaderFavoriteButton = ({ cocktail }: { cocktail: CocktailDetail; }) => {

    // Retrieve favorites-related functions and state from context
    const { isFavorite, toggleFavorite } = useFavoritesContext();

    return (
        <HeaderButton onPress={() => toggleFavorite(cocktail)} iconComponent1={<MaterialIcons/>} iconName1={"favorite-outline"}
                      iconComponent2={<MaterialIcons/>} iconName2={"favorite"} useSecondIcon={isFavorite(cocktail)}
        />
    );
}

export default HeaderFavoriteButton;
