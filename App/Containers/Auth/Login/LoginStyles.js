import {StyleSheet, Platform} from 'react-native';
import { Colors } from '../../../Configs/Colors';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingBottom: 5,
  },
  facebookLoginButton: {
    marginRight: 15,
  },
  googleLoginButton: {
    marginRight: 15,
  },
  paddingVertical: {
    paddingVertical: Platform.OS === 'ios' ? 12 : 10.2,
  },
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  hwrap: {
    paddingHorizontal: 16,
  },
  wrapLogo: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {width: 150, height: 100},
  center: {
    // flex: 1,
  },
  loginText: {
    color: Colors.Black,
    fontSize: 24,
  },
  forgotWrap: {
    marginVertical: 10,
    alignItems: 'flex-end',
  },
  forgotText: {
    color: Colors.Gray8,
    paddingVertical: 5,
  },
  buttonWrap: {
    marginTop: 12,
  },
  separatorWrap: {
    marginTop: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: Colors.Gray4,
  },
  separatorText: {
    color: Colors.Gray8,
  },
  socialWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  touWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    width: '110%',
    marginBottom: 12,
  },
  touText: {
    color: Colors.Gray9,
    fontSize: 14,
  },
  signUpText: {
    fontSize: 14,
    color: Colors.Orange,
  },
});
