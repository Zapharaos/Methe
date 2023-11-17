import {PreferencesContextProvider} from "./src/contexts/preferences/preferences";
import Navigation from "./src/navigation/navigation";
import {useDeviceContext} from "twrnc";
import tw from "./lib/tailwind";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart  } from '@fortawesome/free-solid-svg-icons';

library.add(regularHeart);
library.add(solidHeart);


export default function App() {
    useDeviceContext(tw);
    return (
        <PreferencesContextProvider>
            <Navigation />
        </PreferencesContextProvider>
    );
}
