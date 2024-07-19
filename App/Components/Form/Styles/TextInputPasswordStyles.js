import {StyleSheet} from 'react-native';
import {Colors} from '../../../Configs/Colors';

export default StyleSheet.create({
  wrap: {
    marginTop: 20,
  },
  textInput: {
    borderRadius: 2,
    paddingVertical: 12,
    paddingLeft: 20,
    backgroundColor: Colors.White,
    shadowColor: Colors.Gray13,
    color: Colors.Gray9,
    flex: 1,
  },
  errorText: {
    color: Colors.Error,
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorWrap: {
    borderColor: Colors.Error,
    borderWidth: 1,
  },
  icons: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Gray5,
  },
});
