import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import utils from './utils';
import Routes from '../App/Utils/Route';
import {Colors} from '../App/Configs/Colors';
import {SplashScreen} from '../App/Containers/SplashScreen/index.';
import {AuthStack} from './AuthStack';
import MainDrawer from './Main';
import MyAccount from '../App/Containers/MyAccount';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

let NavStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Splash}
      screenOptions={{
        ...utils.screenOptions,
        headerShown: true,
        headerTintColor: '#000',
        headerBackTitle: true,
        headerStyle: {
          elevation: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
          },
          backgroundColor: Colors.Gray2,
        },
        headerLeftContainerStyle: {
          marginLeft: 12,
        },
      }}>
      <Stack.Screen
        name={Routes.Splash}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Auth}
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Main}
        component={MainDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.MyAccount}
        component={MyAccount}
        options={{
          headerTitle: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerBackImage: () => (
            <Icon name="arrow-back" size={27} color={Colors.Black} />
          ),
          headerStyle: {
            elevation: 0,
            backgroundColor: Colors.Gray3,
          },
        }}
      />
    </Stack.Navigator>
  );
});

const AppWithNavigationState = () => {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
};

export default AppWithNavigationState;
