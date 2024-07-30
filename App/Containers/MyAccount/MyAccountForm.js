import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './style';

const MyAccountForm = ({userProfile, setUserProfile}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={userProfile.name}
        onChangeText={text => setUserProfile({...userProfile, name: text})}
      />
      <Text style={styles.label}>Email (read-only):</Text>
      <TextInput
        style={styles.input}
        value={userProfile.email}
        editable={false}
      />
      <Text style={styles.label}>Phone Number (read-only):</Text>
      <TextInput
        style={styles.input}
        value={userProfile.phone_number}
        editable={false}
      />
    </View>
  );
};

export default MyAccountForm;
