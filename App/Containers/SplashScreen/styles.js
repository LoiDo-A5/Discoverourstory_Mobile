import {StyleSheet} from 'react-native';
import {Colors} from '../../Configs/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gray,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    zIndex: -1,
  },
});
