import { LoginResponseType } from '../../types/LoginResponseType';
import { appApi } from './index';

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponseType,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: '/api/login',
        method: 'POST',
        body: {
          username,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
