import {Text} from "react-native";

import BaseComponent from "@/src/components/base";
import {useFavoritesContext} from "@/src/contexts/favorites";

export default function FavouritesTab() {

    const {favorites} = useFavoritesContext();

    return (
        <BaseComponent>
            {favorites.map((item, index) => (
                <Text key={index}>{item}</Text>
            ))}
        </BaseComponent>
    )
}