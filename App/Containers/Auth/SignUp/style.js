import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    marginBottom: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
  },
  logo: {
    width: 150,
    height: 100,
  },
  input: {
    width: '90%',
    height: 50,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  text: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    color: '#ffffff',
  },
});
