import {createSlice} from '@reduxjs/toolkit';
import {initData} from '../../Utils/Utils';

const initialState = {
  accessToken: '',
  refreshToken: '',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      initData(action.payload);
      return {
        ...state,
        isLogin: true,
        account: action.payload,
      };
    },
    updateAuthentication: (state, action) => {
      const {accessToken, refreshToken} = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isLogin = true;
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;
    },
    setRefreshToken: (state, action) => {
      const refreshToken = action.payload;
      state.refreshToken = refreshToken;
    },
    handleLogout: state => {
      state.accessToken = '';
      state.refreshToken = '';
      state.isLogin = false;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  handleLogout,
  updateAuthentication,
  login,
} = authSlice.actions;

export default authSlice.reducer;
