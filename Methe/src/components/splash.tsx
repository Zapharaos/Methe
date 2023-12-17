import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import Animated, {ZoomOut} from 'react-native-reanimated';
import BaseComponent from "@/src/components/base";

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

// Interface for the props of the SearchBar component
interface SplashScreenAnimatedProps {
    onAnimationFinish: (isCancelled: boolean) => void
}

export const SplashScreenAnimated = ({onAnimationFinish}: SplashScreenAnimatedProps) => {
    const animation = useRef<LottieView>(null);

    return (
        <BaseComponent>
            <LottieViewAnimated
                ref={animation}
                autoPlay
                loop={false}
                onAnimationFinish={onAnimationFinish}
                exiting={ZoomOut}
                source={require('@/assets/animation/animation-light.json')}
            />
        </BaseComponent>
    );
};