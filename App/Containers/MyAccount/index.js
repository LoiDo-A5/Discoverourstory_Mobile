import React, {useState} from 'react';
import {ScrollView, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyAccountNav from './MyAccountNav';
import MyAccountForm from './MyAccountForm';
import {useDispatch, useSelector} from 'react-redux';
import {axiosPatch} from '../../Apis/axios';
import API from '../../Configs/API';
import {updateAccount} from '../../Redux/reducer/authSlice';
import {ToastBottomHelper} from '../../Utils/Utils';
import Routes from '../../Utils/Route';
import styles from './style';

const MyAccount = () => {
  const user = useSelector(state => state.auth.account.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [userProfile, setUserProfile] = useState(user || {});

  const handleSubmitProfile = async () => {
    const formData = new FormData();
    if (userProfile?.avatarUploadFile) {
      formData.append('avatar', userProfile?.avatarUploadFile);
    }
    formData.append('name', userProfile?.name || '');

    const {success, data} = await axiosPatch(API.AUTH.ACCOUNT_INFO, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (success) {
      ToastBottomHelper.success('Update successfully');
      dispatch(updateAccount(data));
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <MyAccountNav userProfile={userProfile} />
      <MyAccountForm
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />
      <Button
        style={styles.buttonSave}
        title={'Save'}
        onPress={handleSubmitProfile}
      />
    </ScrollView>
  );
};

export default MyAccount;
