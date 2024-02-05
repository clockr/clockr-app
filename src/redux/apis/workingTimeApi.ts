import { appApi } from './index';
import { WorkingTimeType } from '../../types/WorkingTimeType';

export const workingTimeApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createWorkingTime: builder.mutation<
      WorkingTimeType,
      { userId: number; payload: Partial<WorkingTimeType> }
    >({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}/working-time`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
    updateWorkingTime: builder.mutation<
      WorkingTimeType,
      { userId: number; id: number; payload: Partial<WorkingTimeType> }
    >({
      query: ({ userId, id, payload }) => ({
        url: `/user/${userId}/working-time/${id}`,
        method: 'PUT',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
    deleteWorkingTime: builder.mutation<
      boolean,
      { userId: number; id: number }
    >({
      query: ({ userId, id }) => ({
        url: `/user/${userId}/working-time/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
  }),
});

export const {
  useCreateWorkingTimeMutation,
  useUpdateWorkingTimeMutation,
  useDeleteWorkingTimeMutation,
} = workingTimeApi;
