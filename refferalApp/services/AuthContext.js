// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { StorageService } from './StorageService';
import config from '../config.json';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  const loadToken = async () => {
    console.log("Loading token");
    try {
      const token = await StorageService.getValue('@token');
      if (token) {
        // Call the backend service to validate the token
        const response = await fetch(config.validateTokenURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        
        console.log(response);
        const data = await response.json();
        if (response.status === 200 ) {
          console.log("Token is valid");
          setUser(token); // Set the user information from the validated token
        } else {
          // Token is not valid, handle accordingly
          signOut(); // This will remove the token from AsyncStorage and reset user state
        }
      }
    } catch (e) {
      console.log("Error loading the token", e);
      Toast.show({
        type: 'error',
        text1: 'System Error',
        text2: 'Unable to load application. Please try again later.',
      });
      // Handle error case, such as a network error or invalid JSON response
    }
    setIsLoading(false);
  };

  const signIn = async (newToken) => {
    try {
      console.log("Signing in with token", newToken)
      await StorageService.storeValue('@token', newToken);
      setUser(newToken);
    } catch (e) {
      console.error("Error during sign-in", e);
    }
  };

  const signOut = async () => {
    try {
      await StorageService.clearAllData();
      setUser(null);
    } catch (e) {
      console.error("Error during sign-out", e);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};