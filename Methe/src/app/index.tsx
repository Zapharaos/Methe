import {Button, Text} from "react-native";
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {Link, useRouter} from "expo-router";
import tw from "../../lib/tailwind";

export default function Index() {
    const router = useRouter();
    const { i18n} = usePreferencesContext();
    return (
        <BaseComponent>
            <Text style={tw`text-black dark:text-white`}>{i18n.t('welcome')}</Text>
            <Link href={'/settings'} asChild>
                <Button title="Settings"/>
            </Link>
        </BaseComponent>
    );
}
