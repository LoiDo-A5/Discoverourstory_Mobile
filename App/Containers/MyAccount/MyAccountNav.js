import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MyAccountNav = ({userProfile}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      {userProfile.avatar && (
        <Image source={{uri: userProfile.avatar}} style={styles.avatar} />
      )}
      <Text style={styles.userName}>{userProfile.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  editProfileText: {
    color: 'blue',
  },
});

export default MyAccountNav;
