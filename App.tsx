import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import {Page} from './src/constants/Page';
import HomeScreen from './src/screens/home';
import IdentityScreen from './src/screens/identity';
import OnboardScreen from './src/screens/onboard';
import PageLayout from './src/components/containers/PageLayout';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Page.Home}>
        <Stack.Screen
          name={Page.Onboard}
          component={OnboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Page.Home}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Page.Login}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Page.Register}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Page.Identity}
          component={IdentityScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
