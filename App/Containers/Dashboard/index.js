import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import API from '../../Configs/API';
import {axiosGet} from '../../Apis/axios';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();

  const getListRoom = async () => {
    const {success, data} = await axiosGet(API.ROOM.LIST_ROOM);
    if (success) {
      setRooms(data);
    }
  };

  useEffect(() => {
    getListRoom();
  }, []);

  const goToRoom = roomId => {
    navigation.navigate('RoomDetail', {roomId});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => goToRoom(item.id)}>
            <Text style={styles.roomName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#e1f5fe',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  roomName: {
    fontSize: 16,
  },
});

export default Dashboard;
