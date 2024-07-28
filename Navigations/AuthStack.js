/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

import utils from './utils';
import {Colors} from '../App/Configs/Colors';
import Device from '../App/Configs/Device';
import Route from '../App/Utils/Route';
import Login from '../App/Containers/Auth/Login/Login';
import SignUp from '../App/Containers/Auth/SignUp/SignUp';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.Login}
      screenOptions={{
        ...utils.screenOptions,
        headerShown: true,
        headerTitleAlign: 'center',
        headerBackImage: () => (
          <Icon
            name="west"
            size={27}
            color={Colors.Black}
            style={styles.icLeft}
          />
        ),
        headerStyle: {
          backgroundColor: Colors.White,
          elevation: 0,
          borderBottomWidth: Device.isIOS === 'android' ? 1 : 0,
          borderColor: Colors.Gray4,
        },
        headerBackTitle: true,
      }}>
      <Stack.Screen
        name={Route.Login}
        component={Login}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={Route.SignUp}
        component={SignUp}
        options={{
          headerTitle: '',
          headerBackImage: () => (
            <Icon name="arrow-back" size={27} color={Colors.Black} />
          ),
          headerStyle: {
            elevation: 0,
            backgroundColor: Colors.White,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icLeft: {
    marginLeft: Device.isIOS ? 8 : 0,
  },
});
