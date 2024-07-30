import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import ImagePickerCrop from 'react-native-image-crop-picker';

const MyAccountNav = ({userProfile, setUserProfile}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const takePhotoFromCamera = () => {
    ImagePickerCrop.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const updatedProfile = {
          ...userProfile,
          avatar: image.path,
          avatarUploadFile: image.path,
        };
        setUserProfile(updatedProfile);
        setModalVisible(false);
      })
      .catch(error => {
        console.error('Error taking photo: ', error);
        setModalVisible(false);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePickerCrop.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setModalVisible(false);
        // Optional: Update userProfile state or upload the image to the server here
      })
      .catch(error => {
        setModalVisible(false);
      });
  };

  return (
    <View style={styles.navContainer}>
      {userProfile?.avatar && (
        <Image source={{uri: userProfile?.avatar}} style={styles.avatar} />
      )}
      <Text style={styles.userName}>{userProfile.name}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Choose an option for the profile picture:
            </Text>
            <Button title="Take Photo" onPress={takePhotoFromCamera} />
            <Button
              title="Pick Image from Gallery"
              onPress={choosePhotoFromLibrary}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  editProfileText: {
    color: 'blue',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MyAccountNav;
