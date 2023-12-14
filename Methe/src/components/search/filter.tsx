// Import necessary components and styles from React Native and external libraries
import React, { Dispatch, SetStateAction, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import tw from "@/lib/tailwind";
import { Entypo } from "@expo/vector-icons";

// Import context and utility functions
import { usePreferencesContext } from "@/src/contexts/preferences/preferences";
import { Cocktail, FilterCocktail } from "@/src/utils/interface/CocktailInterface";
import ModalComponent from "@/src/components/modal";

// Interface for the props of the SearchModal component
interface FilterModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

// Main component for the search modal
export default function FilterModal({ visible, setVisible } : FilterModalProps) {

    // Retrieve the app's preferences from context
    const {i18n} = usePreferencesContext();

    const [filterCocktailList, setFilterCocktailList] = useState<Cocktail[]>();
    const [filterList, setFilterList] = useState<FilterCocktail>();

    // Clear filters
    const onCancel = () => {
    }

    // Clear filters and filter mode
    const onClear = () => {
        onCancel();
    }

    // Executes the filter and closes the modal
    const onExecuteFilter = () => {
        setVisible(false);
    }

    return (
        <ModalComponent title={i18n.t('filter.title')} visible={visible} setVisible={setVisible}>
            {/* Filter */}
            <View style={tw`flex-1 mx-5 gap-5`}>
            </View>
            {/* Footer */}
            <View style={tw`p-5 flex-row justify-between items-center`}>
                <TouchableOpacity onPress={onClear}>
                    <Text style={tw`underline text-lg text-black dark:text-white`}>
                        {i18n.t('filter.buttonClear')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onExecuteFilter} style={tw`p-2 flex-row gap-2 rounded-md bg-darkGrayBrown dark:bg-palePeach`}>
                    <Entypo name="magnifying-glass" size={24} style={tw`text-palePeach dark:text-darkGrayBrown`} />
                    <Text style={tw`text-lg text-palePeach dark:text-darkGrayBrown`}>
                        {i18n.t('filter.buttonSearch')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ModalComponent>
    );
}

