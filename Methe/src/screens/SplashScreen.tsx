import { NavigationProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import tw from 'twrnc';

interface SplashScreenProps {
    navigation: NavigationProp<any>;
}

export default function SplashScreen({ navigation }: SplashScreenProps) {

    const onAnimationFinish = () => {
        navigation.navigate('Home')
    }

    return (
        <LottieView style={tw`flex-1 justify-center items-center`}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
            source={require('../../assets/animation/animation-light.json')}
        />
    );
}