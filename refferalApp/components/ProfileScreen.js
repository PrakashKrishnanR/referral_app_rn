import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch,Image,StatusBar, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants'; // For status bar height

export default function ProfilePage({navigation}) {

    
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
// Placeholder for user data - replace with real data
    const userData = {
    username: 'JohnDoe',
    avatar: 'https://via.placeholder.com/150', // Replace with actual image url
    };

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
        <Text style={styles.username}>{userData.username}</Text>
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
        <TouchableOpacity style={styles.setting}>
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