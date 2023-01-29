import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import { ContextsProvider } from './src/contexts';
import { ActivityIndicator, View } from 'react-native';
import {
  useFonts,
  Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani';
import {
  Ubuntu_400Regular,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu';
import {
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope'


const App = () => {
  let [fontsLoaded] = useFonts({
    Rajdhani_700Bold,
    Ubuntu_400Regular,
    Ubuntu_700Bold,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_700Bold
  })

  return !fontsLoaded ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator/>
    </View>
  ) : (
    <NavigationContainer>
      <ContextsProvider>
        <Routes />
      </ContextsProvider>
    </NavigationContainer>
  );
};

export default App;
