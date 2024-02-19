import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getValidAuthToken } from '../lib/cookies';
import config from "../config/config";

const customFetchBaseQuery = (baseUrl, prepareHeaders) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });

  return async (endpoint, body, extraOptions) => {
    const response = await baseQuery(endpoint, body, extraOptions);

    if (response.error && response.error.status === 401) {
      if (window.location.href?.indexOf('/login') === -1) {
        window.location.href = '/login';
      }
      body.dispatch({ type: 'auth/logout' });
    }

    return response;
  };
};

export const baseQuery = customFetchBaseQuery(
  `${config.REACT_APP_API_URL}/api`,
  (headers, { getState, dispatch }) => {
    // @ts-ignore
    const { token } = getValidAuthToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  },
);
