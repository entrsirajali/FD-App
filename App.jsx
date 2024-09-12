import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MyFDdetails from './screens/MyFDdetails';
import MainPage from './screens/MainPage';
import FDCalculator from './screens/FDCalculator';
import AboutUs from './screens/AboutUs';
import MyBankScreen from './screens/MyBankScreen';
import MyKYC from './screens/MyKYC';
import TermsAndConditions from './screens/TermsAndConditions';
import TranSections from './screens/TranSections';
import Help from './screens/Help';
import LogoutScreen from './screens/LogoutScreen';
import Register from './screens/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="MyFDdetails" component={MyFDdetails} options={{ headerShown: true }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="FDCalculator" component={FDCalculator} options={{ headerShown: true }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: true }} />
        <Stack.Screen name="MyBankScreen" component={MyBankScreen} options={{ headerShown: true }} />
        <Stack.Screen name="MyKYC" component={MyKYC} options={{ headerShown: true }} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: true }} />
        <Stack.Screen name="TranSections" component={TranSections} options={{ headerShown: true }} />
        <Stack.Screen name="Help" component={Help} options={{ headerShown: true }} />
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
