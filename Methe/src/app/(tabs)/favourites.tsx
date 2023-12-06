import BaseComponent from "@/src/components/base";
import {useFavoritesContext} from "@/src/contexts/favorites";
import {Text} from "react-native";

const Favourites = () => {

    const {favorites} = useFavoritesContext();

    return (
        <BaseComponent>
            <Text>
                {favorites}
            </Text>
        </BaseComponent>
    )
}

export default Favourites;