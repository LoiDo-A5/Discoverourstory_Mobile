import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Dashboard = () => {
  const handleClick = async () => {};

  return (
    <View style={styles.container}>
      <Text onPress={handleClick} style={styles.text}>
        Dashboard Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Dashboard;
