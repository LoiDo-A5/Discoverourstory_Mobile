import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import API from '../../Configs/API';
import {axiosGet} from '../../Apis/axios';
import styles from './style';

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

export default Dashboard;
