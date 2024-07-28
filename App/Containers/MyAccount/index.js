import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyAccountNav from './MyAccountNav';
import MyAccountForm from './MyAccountForm';

const MyAccount = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
    avatar: 'https://example.com/avatar.png',
  });

  return (
    <ScrollView style={styles.container}>
      <MyAccountNav userProfile={userProfile} />
      <MyAccountForm
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default MyAccount;
