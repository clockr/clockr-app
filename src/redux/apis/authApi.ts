import { LoginResponseType } from '../../types/LoginResponseType';
import { appApi } from './index';

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponseType,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
    }),
    refresh: builder.mutation<any, string>({
      query: (refreshToken) => ({
        url: `/oauth/access_token?grant_type=refresh_token&refresh_token=${refreshToken}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApi;
