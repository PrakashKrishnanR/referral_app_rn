import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Switch,Image,StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { StorageService } from '../services/StorageService';
import axios from 'axios';
import config from '../config.json';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {/* Add any additional loading indicators or text if desired */}
    </View>
  );
};

export default function ProfilePage({navigation}) {

    
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
// Placeholder for user data - replace with real data
    const userData = {
    username: 'JohnDoe',
    avatar: 'https://via.placeholder.com/150', // Replace with actual image url
    };

  const [userName, setUserName] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const generateReferralCode = async () => {
    try {
      // Replace 'your-backend-endpoint' with your actual backend URL
      const authToken = await StorageService.getValue('userToken');
      const response = await axios.get(config.referralURL,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data); // Log the response for testing
      // Assuming the JWT token is in the response data with key 'token'
      const shortLink = `${config.clipboardURL}${response.data}`;

      console.log(shortLink);

      Clipboard.setStringAsync(shortLink);

      Toast.show({
        type: 'success',
        text1: 'Referral URL copied to clipboard',
      });
    } catch (error) {
      // Displaying error message using toast
      console.log(error.response.data);
      const errorMessage = error.response?.data || 'Login failed. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Unable to generate referral code',
        text2: errorMessage,
      });
      actions.setSubmitting(false); // Set submitting to false on error
    }
  };


  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await StorageService.getValue('userName');
        if (storedData !== null) {
          // If we have data, parse it and set it to state
          setUserName(storedData);
        }
        setIsReady(true); // Indicate that the component is ready to render
      } catch (e) {
        // Handle read error
        console.log("Error reading the data", e);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (!isReady) {
    // You can return a loading indicator, or null to render nothing
    return <LoadingIndicator />;
  }

  return (
    
    <View style={styles.container}>
             <StatusBar barStyle="light-content" backgroundColor="#70226E" />
      <View style={styles.header}>
      <View style={styles.inline}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="white"  />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        </View>
     
      </View>
      <View style={styles.profileSection}>
        <Image style={styles.avatar} source={require('../assets/user.png')} />
        <Text style={styles.username}>{userName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.setting}>
        <MaterialCommunityIcons name="brightness-6" size={24} color="black"  />
          <Text style={styles.settingText}>Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </View>
        <TouchableOpacity style={styles.setting}>
          <MaterialIcons name="lock" size={24} color="black" />
          <Text style={styles.settingText}>Change Password</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black"  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <MaterialIcons name="language" size={24} color="black" />
          <Text style={styles.settingText}>Language</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black"  />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Information</Text>
        <TouchableOpacity style={styles.setting}>
          <FontAwesome name="info-circle" size={24} color="black" />
          <Text style={styles.settingText}>About App</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black"  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <MaterialIcons name="description" size={24} color="black" />
          <Text style={styles.settingText}>Terms and Condition</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black"  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting}>
          <MaterialIcons name="privacy-tip" size={24} color="black" />
          <Text style={styles.settingText}>Privacy Policy</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black"  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.setting} onPress={()=> generateReferralCode()}>
          <MaterialIcons name="share" size={24} color="black" />
          <Text style={styles.settingText}>Share This App</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black"  />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: 'white',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Adjust for a circular avatar
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#70226E',
    padding: 40,
    height:150,
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'flex-start',

  },
  headerTitle: {
    flex:1,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  content: {
    padding: 20,
  },inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#E8E8E8',
    padding: 10,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
  },
});