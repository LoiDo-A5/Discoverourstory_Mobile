import {StyleSheet} from 'react-native';
import {Colors} from '../../Configs/Colors';

export default StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 10,
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
    marginRight: 10,
  },
  textName: {
    fontWeight: 600,
    marginBottom: 5,
    fontSize: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});
