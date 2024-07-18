import React, {useCallback, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Image, Text} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Colors} from '../App/Configs/Colors';
import {useSelector} from 'react-redux';

export const SplashScreen = () => {
  const navigation = useNavigation();
  const {isLogin} = useSelector(state => state.auth);

  const resetNavigation = useCallback(
    routeName => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      });
      navigation.dispatch(resetAction);
    },
    [navigation],
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (isLogin) {
        resetNavigation('Main');
      } else {
        resetNavigation('Auth');
      }
    };
    checkAuth();
  }, [isLogin, resetNavigation]);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator style={styles.icon} size="large" />
        <Image resizeMode="contain" style={styles.logo} />
        <Text>123</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gray,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    zIndex: -1,
  },
});
