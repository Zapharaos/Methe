import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import Animated, {ZoomOut} from 'react-native-reanimated';
import {useAppColorScheme} from "twrnc";
import tw from "@/lib/tailwind";

import BaseComponent from "@/src/components/base";
const DarkThemeAnimation = require('@/assets/animation/animation-dark.json')
const LightThemeAnimation = require('@/assets/animation/animation-light.json')

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

// Interface for the props of the SearchBar component
interface SplashScreenAnimatedProps {
    onAnimationFinish: (isCancelled: boolean) => void
}

export const SplashScreenAnimated = ({onAnimationFinish}: SplashScreenAnimatedProps) => {
    const animation = useRef<LottieView>(null);

    const [colorScheme] = useAppColorScheme(tw);

    return (
        <BaseComponent>
            <LottieViewAnimated
                ref={animation}
                autoPlay
                loop={false}
                onAnimationFinish={onAnimationFinish}
                exiting={ZoomOut}
                source={colorScheme === 'dark' ? DarkThemeAnimation : LightThemeAnimation}
            />
        </BaseComponent>
    );
};