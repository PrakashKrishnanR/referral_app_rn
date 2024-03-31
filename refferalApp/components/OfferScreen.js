import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

function OffersScreen() {
  const navigation = useNavigation();

  const [pdfUri, setPdfUri] = useState('');

  useEffect(() => {
    // Fetch the PDF from the API
    // This is a placeholder for your API call
    const fetchPdf = async () => {
      // Example: const response = await fetch('your-api-endpoint');
      // setPdfUri(response.uri);
      setPdfUri('http://samples.leanpub.com/thereactnativebook-sample.pdf'); // Sample PDF link
    };
    fetchPdf();
  }, []);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers</Text>
      </View>
      <WebView
        source={{ uri: pdfUri }}
        style={{ flex: 1 }}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="home" size={24} color="#70226E" />
          <Text style={styles.iconDescription}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="pricetags" size={24} color="black" />
          <Text style={styles.iconDescription}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="notifications" size={24} color="black" />
          <Text style={styles.iconDescription}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate(ProfilePage)}>
          <Ionicons name="settings" size={24} color="black" />
          <Text style={styles.iconDescription}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#70226E',
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 10,
    height: 100,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  footerIcon: {
    alignItems: 'center',
  },
  iconDescription: {
    fontSize: 10,
  },
});

export default OffersScreen;