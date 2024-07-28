import React, {useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertModal from '../../Components/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import Text from '../../Components/Text';
import {Colors} from '../../Configs/Colors';
import Routes from '../../Utils/Route';
import {handleLogout} from '../../Redux/reducer/authSlice';

const DrawerContainer = ({navigation}) => {
  const alertRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const doLogout = () => {
    dispatch(handleLogout());
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: 'Auth'}],
    });
    navigation.dispatch(resetAction);
    alertRef.current.hideModal();
  };

  const onLogout = () => {
    alertRef.current.alert('Account logout do you really want to logout', '', [
      {
        label: 'logout',
        onPress: doLogout,
        style: {marginRight: 7},
      },
      {
        primary: true,
        label: 'cancel',
        onPress: () => alertRef.current.hideModal(),
        style: {marginLeft: 7},
      },
    ]);
  };

  const goToMyAccount = () => {
    navigation.navigate(Routes.MyAccount);
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.row, styles.logoWrap]}>
          <View style={styles.avatarBackground}>
            {user?.avatar_url ? (
              <Image source={{uri: user?.avatar_url}} style={styles.avatar} />
            ) : (
              <View>
                <Icon name="account-circle" size={52} />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={[styles.fullName]}>{user?.name}</Text>
              <Text style={[styles.email]}>{user ? user.full_name : ''}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerRow}>
          <View>
            <Row
              onPress={goToMyAccount}
              image={'perm-identity'}
              name={'My account'}
            />
            <Row
              onPress={() => navigation.navigate(Routes.Language)}
              image={'language'}
              name={'Language'}
            />
            <Row onPress={onLogout} image={'logout'} name={'Logout'} />
          </View>
        </View>
        <AlertModal ref={alertRef} />
      </ScrollView>
    </SafeAreaView>
  );
};

export const Row = ({name, onPress, image, borderBottom, testID}) => {
  const nameActiveFeature = [
    'text_my_account',
    'text_language',
    'logout',
    'policy',
    'text_contact',
  ];
  const textColor = nameActiveFeature.indexOf(name) && 'black';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.row,
        styles.optionWrap,
        borderBottom && styles.borderBottom,
      ]}>
      <Icon
        name={image}
        size={24}
        color={nameActiveFeature.indexOf(name) && 'black'}
      />

      <View style={styles.wrapText}>
        <Text
          style={[
            styles.text,
            {
              color: textColor,
            },
          ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapText: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.Gray8,
  },
  wrap: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  borderBottom: {
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  logoWrap: {
    paddingTop: 32,
    paddingLeft: 28,
    paddingRight: 23,
  },
  optionWrap: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 32,
  },
  logo: {
    width: 32,
    height: 16,
    position: 'absolute',
    top: 10,
    left: 30,
  },

  avatarBackground: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 22,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Colors.Gray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'flex-start',
    flex: 1,
  },
  fullName: {
    backgroundColor: Colors.TextTransparent,
    fontSize: 16,
    marginBottom: 6,
    color: Colors.Black,
    fontWeight: 'bold',
  },
  email: {
    backgroundColor: Colors.TextTransparent,
    fontSize: 14,
    color: Colors.Gray8,
  },
  containerRow: {
    paddingHorizontal: 28,
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default DrawerContainer;
