import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getListMessage = async () => {
    if (!id) {
      return;
    }
    const {success, data} = await axiosGet(
      `${API.MESSAGE.LIST_MESSAGES}?room_id=${id}`,
    );
    if (success) {
      const normalizedData = data.map(msg => ({
        ...msg,
        sender: {...msg.sender, id: msg.sender.id || msg.sender.user_id},
      }));
      setListMessage(normalizedData);
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
          const isMe = user.id === (item.sender?.id || item.user?.id);
          return (
            <View style={isMe ? styles.myMessage : styles.otherMessage}>
              <View style={styles.messageContainer}>
                {item.sender?.avatar || item.user?.avatar ? (
                  <Image
                    source={{uri: item.sender?.avatar || item.user?.avatar}}
                    style={styles.avatarStyle}
                  />
                ) : (
                  <View style={styles.iconContainer}>
                    <Icon name="account-circle" size={40} color="#888" />
                  </View>
                )}
                <Text style={styles.textName}>
                  {isMe ? 'Me' : item.sender?.name || item.user?.name}
                </Text>
              </View>
              <Text>{item.content || item.message}</Text>
              <Text style={styles.timestamp}>
                {moment(item.timestamp).format('HH:mm DD/MM/YYYY')}
              </Text>
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
          style={styles.input}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RoomDetail;
