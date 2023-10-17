import {PreferencesContextProvider} from "./src/contexts/preferences";
import Navigation from "./src/navigation/navigation";
import {useDeviceContext} from "twrnc";
import tw from "./lib/tailwind";

export default function App() {
    useDeviceContext(tw);
    return (
        <PreferencesContextProvider>
            <Navigation />
        </PreferencesContextProvider>
    );
}
