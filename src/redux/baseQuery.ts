import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getValidAuthToken } from '../lib/cookies';
import { authApi } from './apis/authApi';
import config from "../config/config";

const customFetchBaseQuery = (baseUrl, prepareHeaders) => {
  const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders });

  return async (endpoint, body, extraOptions) => {
    let response = await baseQuery(endpoint, body, extraOptions);

    if (response.error && response.error.status === 401) {
      if (endpoint.url?.indexOf('/oauth/access_token') === -1) {
        const refreshResponse = await body.dispatch(
          authApi.endpoints.refresh.initiate(
            body.getState().auth.refresh_token,
          ),
        );
        if (refreshResponse.data) {
          response = await baseQuery(endpoint, body, extraOptions);
          return response;
        } else {
          body.dispatch({ type: 'auth/logout' });
        }
      } else {
        body.dispatch({ type: 'auth/logout' });
      }
    }
    return response;
  };
};

export const baseQuery = customFetchBaseQuery(
  `${config.REACT_APP_API_URL}`,
  (headers, { getState, dispatch }) => {
    // @ts-ignore
    const { token } = getValidAuthToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  },
);
