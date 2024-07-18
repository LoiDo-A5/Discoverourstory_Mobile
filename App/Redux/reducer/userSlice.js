import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  password: '',
  user_name: '',
  full_name: '',
  email: '',
  phone_number: '',
  address: '',
  avatar_url: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.user_name = action.payload.user_name;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
      state.address = action.payload.address;
    },
    updateAvatarUrl: (state, action) => {
      state.avatar_url = action.payload.avatar_url;
    },
    resetUser: state => {
      state.id = '';
      state.password = '';
      state.user_name = '';
      state.full_name = '';
      state.email = '';
      state.phone_number = '';
      state.address = '';
      state.avatar_url = '';
    },
  },
});

export const {updateUser, updateAvatarUrl, resetUser} = userSlice.actions;

export default userSlice.reducer;
