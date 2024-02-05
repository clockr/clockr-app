import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    'USER_MANAGEMENT_USER_LIST',
    'USER_MANAGEMENT_USER',
    'USER_MONTH',
    'USER_YEAR',
  ],
});
