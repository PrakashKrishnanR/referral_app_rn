import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const CreateAccountScreen = () => {
  const navigation = useNavigation();

  const handleCreateAccount = async (values, { setSubmitting }) => {
    try {
      // Your create account logic here
      const response = await axios.post('your_backend_endpoint', values);
      console.log(response.data); // Log the response for testing
      Toast.show({
        type: 'success',
        text1: 'Account created successfully',
      });
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error creating account',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#70226E" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.headerIcon}>
          <AntDesign name="left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Your Account</Text>
      </View>
      <View style={styles.body}>
        <Formik
          initialValues={{
            email: '',
            fullName: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email('Invalid email').required('Email is required'),
            fullName: yup.string().required('Full Name is required'),
            username: yup.string().required('Username is required'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
          })}
          onSubmit={handleCreateAccount}
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
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Full Name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  style={styles.input}
                />
              </View>
              {errors.fullName && touched.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                <View style={styles.inputContainer}>
                  <TextInput
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  style={styles.input}
                />
              </View>
              {errors.username && touched.username && <Text style={styles.errorText}>{errors.username}</Text>}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                  secureTextEntry
                />
              </View>

              {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              {errors.confirmPassword && touched.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              <View style={styles.inputContainer}>

                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  style={[styles.button, { opacity: isSubmitting ? 0.5 : 1 }]}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
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
    height:150,
    paddingTop: StatusBar.currentHeight + 50, // Adjust for status bar height
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#70226E',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor:'white',
    borderRadius: 20
  },
});

export default CreateAccountScreen;
