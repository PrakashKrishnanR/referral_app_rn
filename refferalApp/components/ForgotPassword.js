import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const handleSendPassword = async (values, { setSubmitting }) => {
    // Your backend call logic here
    try {
      console.log('Sending password to email:', values.email);
      const response = await axios.post('http://localhost:8090/api/login', {
        email: values.email,
      });

      // Assuming the JWT token is in the response data with key 'token'
      const jwtToken = response.data.token;

      Toast.show({
        type: 'success',
        text1: 'Password sent successfully!!',
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error sending password',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#70226E" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <AntDesign name="left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={styles.body}>
        <AntDesign name="lock" size={100} color="#70226E" style={styles.icon} />
        <Text style={styles.troubleText}>Trouble logging in?</Text>
        <Text style={styles.enterEmailText}>Enter email to send password</Text>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={yup.object().shape({
            email: yup.string().email('Invalid email').required('Email is required'),
          })}
          onSubmit={handleSendPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize='none'
              />
              </View>
              {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={[styles.button, { opacity: isSubmitting ? 0.5 : 1 }]}
              >
                <Text style={styles.buttonText}>Send Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footer}>
        <Text style={styles.footerText}>Return to Login Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#70226E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 40, // Adjust for status bar height
    height:125,
    justifyContent: 'space-between',
  },
  headerIcon: {
    marginRight: 50,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    flex: 2, // Allow the title to take up remaining space
    textAlign: 'center', // Center the title
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  troubleText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  enterEmailText: {
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#70226E',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  footer: {
    backgroundColor: '#70226E',
    padding: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor:'white',
    borderRadius: 20
  },
});

export default ForgotPasswordScreen;
