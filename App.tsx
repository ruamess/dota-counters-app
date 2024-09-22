import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import { useEffect, useState } from 'react';
import getHeroesData from '@utils/getHeroesData';
import { Store } from 'store';
import { observer } from 'mobx-react-lite';
import CustomSplashScreen from '@components/CustomSplashScreen';

const Stack = createNativeStackNavigator()

const App = observer(() => {

  const [isSplashScreen, setIsSplashScreen] = useState(true)

  useEffect(() => {
    const fetchHeroes = async () => {
      await getHeroesData();
      setIsSplashScreen(false);
    };

    fetchHeroes();
  }, [])

  return (
    <>
      {
        isSplashScreen
          ?
          <CustomSplashScreen />
          :
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Counters' component={Home} options={{}} />
            </Stack.Navigator>
          </NavigationContainer>
      }
    </>

  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
