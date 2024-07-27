import React from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {axiosPost} from '../../Apis/axios';
import API from '../../Configs/API';
import Routes from '../../Utils/Route';
import {useNavigation} from '@react-navigation/native';
import Images from '../../Configs/Images';

const SignUp = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async data => {
    if (data.password !== data.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password and Confirm Password do not match',
      });
      return;
    }

    try {
      const {success} = await axiosPost(API.AUTH.SIGNUP, {
        email: data?.email,
        phone: data?.phone,
        password1: data?.password,
        password2: data?.confirmPassword,
      });

      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Signup Successful',
          text2: 'You have successfully signed up',
        });
        navigation.navigate(Routes.Login);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Please check your information and try again',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.text}>SIGN UP</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /\S+@\S+\.\S+/,
        }}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>This is not a valid email.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]+$/,
        }}
        name="phone"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Phone"
            keyboardType="numeric"
          />
        )}
      />
      {errors.phone && (
        <Text style={styles.errorText}>Phone must contain only digits.</Text>
      )}

      <Controller
        control={control}
        rules={{required: true}}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>Password is required.</Text>
      )}

      <Controller
        control={control}
        rules={{required: true}}
        name="confirmPassword"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Confirm Password"
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>Confirm Password is required.</Text>
      )}

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    marginBottom: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
  },
  logo: {
    width: 150,
    height: 100,
  },
  input: {
    width: '90%',
    height: 50,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  text: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    color: '#ffffff',
  },
});

export default SignUp;
