import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthContext, { AuthProvider } from './services/AuthContext';
import LoginScreen from './components/LoginScreen';
import OfferScreen from './components/OfferScreen';
import ProfilePage from './components/ProfileScreen';
import CreateAccountScreen from './components/CreateAccount';
import ForgotPasswordScreen from './components/ForgotPassword';
import LoadingScreen from './components/LoadingScreen';
import Toast from 'react-native-toast-message';


const Stack = createStackNavigator();

export default function App() {
  

  return (
    <AuthProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="AuthLoading"
          screenOptions={{
            headerShown: false, // This will hide the header for all screens
          }}>
            <Stack.Screen name="AuthLoading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} />
            <Stack.Screen name='Offers' component={OfferScreen} />
            <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
        
    </AuthProvider>    
  );
}

