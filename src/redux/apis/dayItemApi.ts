import { DayItemType } from '../../types/DayItemType';
import { appApi } from './index';

export const dayItemApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createDayItem: builder.mutation<
      DayItemType,
      { userId: number; payload: Partial<DayItemType> }
    >({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}/day-item`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
    deleteDayItem: builder.mutation<boolean, { userId: number; id: number }>({
      query: ({ userId, id }) => ({
        url: `/user/${userId}/day-item/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
  }),
});

export const { useCreateDayItemMutation, useDeleteDayItemMutation } =
  dayItemApi;
