import { createSlice } from '@reduxjs/toolkit';
import { removeCookie, setAuthCookie } from '../../lib/cookies';
import { LoginResponseType } from '../../types/LoginResponseType';
import { authApi } from '../apis/authApi';

const initialState: Partial<LoginResponseType> = {};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      removeCookie('auth_token');
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (_state, { payload }) => {
        const { access_token, ...other } = payload;
        setAuthCookie(access_token, other.expires_in);
        return other;
      },
    );
    builder.addMatcher(
      authApi.endpoints.refresh.matchFulfilled,
      (_state, { payload }) => {
        const { access_token, ...other } = payload;
        setAuthCookie(access_token, other.expires_in);
        return other;
      },
    );
  },
});

export const authReducer = slice.reducer;
export const { logout } = slice.actions;
