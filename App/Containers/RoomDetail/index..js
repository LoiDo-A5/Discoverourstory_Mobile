import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Text from '../../Components/Text';
import {useSelector} from 'react-redux';
import useChat from '../../Hooks/useChat';
import {axiosGet} from '../../Apis/axios';
import API from '../../Configs/API';
import moment from 'moment';

const RoomDetail = () => {
  const route = useRoute();
  const {id} = route.params;
  const user = useSelector(state => state.auth.account.user);
  const [roomId, setRoomId] = useState(id || '');
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    setRoomId(id);
  }, [id]);

  const {messages, sendMessage} = useChat(roomId);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, user?.username);
      setMessage('');
    }
  };

  const getListMessage = async () => {
    if (!roomId) {
      return;
    }
    const {success, data} = await axiosGet(
      `${API.MESSAGE.LIST_MESSAGES}?room_id=${roomId}`,
    );
    if (success) {
      setListMessage(data);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    if (roomId) {
      getListMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [listMessage, messages]);

  return (
    <KeyboardAvoidingView style={styles.background} behavior="padding">
      <FlatList
        data={[...listMessage, ...messages]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View
            style={
              item.sender.id === user.id
                ? styles.myMessage
                : styles.otherMessage
            }>
            <Image
              source={{uri: item.sender.avatar}}
              style={styles.avatarStyle}
            />
            <Text>{item.sender.name}</Text>
            <Text>{item.message}</Text>
            <Text>{moment(item.timestamp).format('HH:mm DD/MM/YYYY')}</Text>
          </View>
        )}
        ref={messagesEndRef}
      />
      <View>
        <TextInput
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSendMessage}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  myMessage: {
    alignSelf: 'flex-end',
    margin: 20,
    padding: 12,
    backgroundColor: '#DCF8C6',
    borderRadius: 20,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    margin: 20,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  listItemText: {
    flexShrink: 1,
  },
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textName: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of width/height to make it round
  },
});

export default RoomDetail;
