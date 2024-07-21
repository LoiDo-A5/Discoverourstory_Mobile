import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignUp Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SignUp;
