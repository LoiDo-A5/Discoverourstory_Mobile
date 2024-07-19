import React, {useCallback, useEffect} from 'react';
import {View, ActivityIndicator, Image, ImageBackground} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import styles from './styles';
import Routes from '../../Utils/Route';
import Images from '../../Configs/Images';

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
        resetNavigation(Routes.Main);
      } else {
        resetNavigation(Routes.Auth);
      }
    };
    checkAuth();
  }, [isLogin, resetNavigation]);

  return (
    <ImageBackground
      source={Images.background}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.loadingContainer}>
        <ActivityIndicator style={styles.icon} size="large" />
        <Image resizeMode="contain" style={styles.logo} />
      </View>
    </ImageBackground>
  );
};
