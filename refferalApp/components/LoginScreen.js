import React,{useState, useContext} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons from Expo
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import config from '../config.json';
import { StorageService } from '../services/StorageService';
import { AuthContext } from '../services/AuthContext';

const CustomCheckbox = ({ isChecked, onCheckChange, label }) => {
    return (
      <TouchableWithoutFeedback onPress={onCheckChange}>
        <View style={checkBoxStyles.container}>
          <View style={[checkBoxStyles.checkbox, isChecked && checkBoxStyles.checkboxChecked]}>
            {isChecked && <View style={checkBoxStyles.checkedView} />}
          </View>
          {label && <Text style={checkBoxStyles.label}>{label}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  
const checkBoxStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 14,
      height: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      marginRight: 8,
      paddingLeft:10,
    },
    checkboxChecked: {
      backgroundColor: 'black',
    },
    checkedView: {
      width: 12,
      height: 12,
      backgroundColor: 'white',
    },
    label: {
    marginRight:'auto',
      fontSize: 12,
    },
  });

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
  
const LoginScreen = ({navigation}) => {
    const [checked, setChecked] = useState(false);
    const { signIn } = useContext(AuthContext);
  const handleCheckChange = () => {
    setChecked(!checked);
  };
  const handleLogin = async (values, actions) => {
    try {
      // Replace 'your-backend-endpoint' with your actual backend URL
      const response = await axios.post(config.loginURL, {
        email: values.email,
        password: values.password,
      });

      console.log(response.data); // Log the response for testing
      // Assuming the JWT token is in the response data with key 'token'
      const jwtToken = response.data.accessToken;
      StorageService.storeValue('userToken', jwtToken);
      StorageService.storeValue('userEmail', response.data.email);
      StorageService.storeValue('userName', response.data.username);
      signIn(jwtToken);
      Toast.show({
        type: 'success',
        text1: 'Login successful!',
      });
      navigation.navigate('Offers');
    } catch (error) {
      // Displaying error message using toast
      console.log(error.response.data);
      const errorMessage = error.response?.data || 'Login failed. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Login error',
        text2: errorMessage,
      });
      actions.setSubmitting(false); // Set submitting to false on error
    }
  };

  return (

    <View style={styles.container}>
      <View style={styles.upperHalf}>
      <Image
            style={styles.logo}
            source={require('../assets/logo2.jpeg')}
          />
      </View>
      <View style={styles.lowerHalf}></View>
      <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >{({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
      <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.textInputWrapper}>
        <MaterialCommunityIcons name="account-circle-outline" size={24} color="white" style={styles.icon} />
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
          </View>
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            <View style={styles.textInputWrapper}>
                  <MaterialCommunityIcons name="lock-outline" size={24} color="white" style={styles.icon} />
                  <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                  autoCapitalize='none'
                  secureTextEntry
                  />
            </View>
          </View>
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <View style={styles.inline}>
            <View style={styles.checkboxLabel}>
            <CustomCheckbox
      isChecked={checked}
      onCheckChange={handleCheckChange}
      label="Remeber me"
    />
            </View>
       
          <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          buttonColor="#70226E"
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.button}
        >
          Login
        </Button>
        <Text style={styles.orStyle}></Text>
        <Button
          icon={() => <MaterialCommunityIcons name="facebook" size={20} color="white" />}
          style={styles.button}
          mode="contained"
          buttonColor="#1877F2"
          onPress={() => {}}
        >
          Sign in with Facebook
        </Button>
        <Button
          icon={() => <MaterialCommunityIcons name="google" size={20} color="white" />}
          style={styles.button}
          mode="contained"
          buttonColor="#34A853"
          onPress={() => {}}
        >
          Sign in with Google
        </Button>

        <View style={styles.accountInline}>
         
          <Text style={styles.accountLabel}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.forgotPassword}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

    </Formik>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#70226E',
  },
  upperHalf: {
    flex: 0.6,
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems:'center',
    justifyContent:'center'
  },
  lowerHalf: {
    flex: 0.4,
    backgroundColor: '#70226E',
  },
  formContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    top: '40%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 4,
    borderRadius: 20,
    margin:25
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  checkboxStyle:{
    flexDirection:'row',
    alignItems:'center'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor:'white',
    borderRadius:20,
    borderColor:'#ccc'
  },
  icon: {
    color: '#70226E',
   marginTop:15,
   marginLeft:15
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    flex:0.9,
    backgroundColor: 'white',
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'blue',
  },
  accountInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginBottom: 3,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft:10,
    marginRight: 'auto',
    padding:0
  },
  accountLabel: {
    marginRight: 'auto',
    paddingLeft: 10
  },
  button: {
    marginVertical: 5,
    marginBottom: 5
  },
  orStyle: {
    alignSelf: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
