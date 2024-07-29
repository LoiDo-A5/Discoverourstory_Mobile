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
    updateAccount: (state, action) => {
      return {
        ...state,
        account: {
          ...state.account,
          user: {
            ...state.account.user,
            ...action.payload,
          },
        },
      };
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
  updateAccount,
  login,
} = authSlice.actions;

export default authSlice.reducer;
