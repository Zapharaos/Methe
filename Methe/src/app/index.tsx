import {Button} from "react-native";
import {usePreferencesContext} from "../contexts/preferences/preferences";
import BaseComponent from "../components/base";
import {Link} from "expo-router";
import tw from "../../lib/tailwind";

export default function Index() {
    const { i18n} = usePreferencesContext();
    return (
        <BaseComponent>
            <Link href={'/settings'} asChild>
                <Button title="exemple de lien a delete"/>
            </Link>
        </BaseComponent>
    );
}
