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
  const {messages, sendMessage} = useChat(id);
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (id) {
      getListMessage();
    }
  }, [id]);

  const getListMessage = async () => {
    if (!id) return;
    const {success, data} = await axiosGet(
      `${API.MESSAGE.LIST_MESSAGES}?room_id=${id}`,
    );
    if (success) {
      setListMessage(data);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: false});
    }
  }, [listMessage, messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, user?.username);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background} behavior="padding">
      <FlatList
        ref={flatListRef}
        data={[...listMessage, ...messages]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          const isMe = item.sender?.id === user?.id;
          return (
            <View style={isMe ? styles.myMessage : styles.otherMessage}>
              <Image
                source={{uri: item.sender?.avatar}}
                style={styles.avatarStyle}
              />
              <Text>{item.sender?.name}</Text>
              <Text>{item.content || item.message}</Text>
              <Text>{moment(item.timestamp).format('HH:mm DD/MM/YYYY')}</Text>
            </View>
          );
        }}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({animated: true})
        }
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
    margin: 10,
    padding: 10,
    backgroundColor: '#DCF8C6',
    borderRadius: 20,
    maxWidth: '80%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxWidth: '80%',
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default RoomDetail;
