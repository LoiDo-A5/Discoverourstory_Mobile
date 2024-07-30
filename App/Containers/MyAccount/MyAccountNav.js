import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import ImagePickerCrop from 'react-native-image-crop-picker';
import styles from './style';

const CustomButton = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

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
        if (error.message === 'User cancelled image selection') {
          console.log('Image selection was cancelled by the user.');
        } else {
          console.error('Error picking image: ', error);
        }
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
        const updatedProfile = {
          ...userProfile,
          avatar: image.path,
          avatarUploadFile: image.path,
        };
        setUserProfile(updatedProfile);
        setModalVisible(false);
      })
      .catch(error => {
        if (error.message === 'User cancelled image selection') {
          console.log('Image selection was cancelled by the user.');
        } else {
          console.error('Error picking image: ', error);
        }
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
            <CustomButton title="Take Photo" onPress={takePhotoFromCamera} />
            <CustomButton
              title="Pick Image from Gallery"
              onPress={choosePhotoFromLibrary}
            />
            <CustomButton
              title="Cancel"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyAccountNav;
