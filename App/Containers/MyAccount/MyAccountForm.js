import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
});

export default MyAccountForm;
