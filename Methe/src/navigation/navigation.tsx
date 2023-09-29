import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
      <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default Navigation;
