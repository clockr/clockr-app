import { appApi } from './index';

export const userApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonth: builder.query<any, { id: number; year: number; month: number }>({
      query: ({ id, year, month }) => ({
        url: `/user/${id}/month/${year}/${month}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      providesTags: (result, error, arg) => [{ type: 'USER_MONTH' }],
    }),
    getYear: builder.query<any, { id: number; year: number }>({
      query: ({ id, year }) => ({
        url: `/user/${id}/year/${year}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      providesTags: (result, error, arg) => [{ type: 'USER_YEAR' }],
    }),
  }),
});

export const { useGetMonthQuery, useGetYearQuery } = userApi;
