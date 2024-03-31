import React, {useContext, useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext, AuthProvider } from '../services/AuthContext';

const LoadingScreen = ({navigation}) => {
    const { user } = useContext(AuthContext);

  useEffect(() => {
    navigation.navigate(user ? 'Offers' : 'Profile');
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#70226E', '#E8E8E8']}
        style={styles.gradient}
      />
      <ActivityIndicator size="large" color="#70226E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default LoadingScreen;
