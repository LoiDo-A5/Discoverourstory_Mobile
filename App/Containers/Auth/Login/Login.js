import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Button, SafeAreaView, Image, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './LoginStyles';
import {useSelector} from 'react-redux';

import Images from '../../../Configs/Images';
import LoadingScreen from '../../../Components/LoadingView';
import Text from '../../../Components/Text';
import TextInput from '../../../Components/Form/TextInput';
import TextInputPassword from '../../../Components/Form/TextInputPassword';
import Routes from '../../../Utils/Route';

const Login = () => {
  const {isLogin} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const isLoading = false;

  const [phone, setPhoneState] = useState('');
  const [phoneError, setPhoneErrorState] = useState();
  const [password, setPasswordState] = useState('');
  const [passwordError, setPasswordlErrorState] = useState();

  console.log('123321');

  const validate = () => {
    Keyboard.dismiss();
    let hasError = false;
    if (!phone) {
      setPhoneErrorState('Please enter your phone number');
      hasError = true;
    } else {
      setPhoneErrorState('');
    }
    if (!password) {
      setPasswordlErrorState('Please enter your password');
      hasError = true;
    } else {
      setPasswordlErrorState('');
    }
    if (!hasError) {
      // handleClickLogin({username: phone, password: password});
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, [isLogin, navigation]);

  return (
    <SafeAreaView style={styles.wrap}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.scrollView, styles.hwrap]}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.wrapLogo}>
            <Image
              source={Images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={[styles.center]}>
            <Text bold style={styles.loginText}>
              {'LOGIN'}
            </Text>
            <TextInput
              placeholder={'Phone Number'}
              onChange={setPhoneState}
              errorText={phoneError}
              value={phone}
              keyboardType={'numeric'}
              textInputStyle={styles.paddingVertical}
            />
            <TextInputPassword
              secureTextEntry
              placeholder={'Password'}
              onChange={setPasswordState}
              value={password}
              errorText={passwordError}
              textInputStyle={styles.paddingVertical}
              returnKeyType={'done'}
              onSubmitEditing={validate}
            />

            <View style={[styles.buttonWrap]}>
              <Button type="auth" title={'Login'} onPress={validate} />
            </View>
          </View>

          <View style={styles.touWrap}>
            <Text style={[styles.touText]}>{'Dont have an account ?.'}</Text>
            <Text
              bold
              style={styles.signUpText}
              onPress={() => navigation.navigate(Routes.SignUp)}>
              {' ' + 'Sign up'}
            </Text>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default Login;
