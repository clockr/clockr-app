import { appApi } from './index';
import { ManualEntryType } from '../../types/ManualEntryType';

export const manualEntryApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createManualEntry: builder.mutation<
      ManualEntryType,
      { userId: number; payload: Partial<ManualEntryType> }
    >({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}/manual-entry`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
    updateManualEntry: builder.mutation<
      ManualEntryType,
      { userId: number; id: number; payload: Partial<ManualEntryType> }
    >({
      query: ({ userId, id, payload }) => ({
        url: `/user/${userId}/manual-entry/${id}`,
        method: 'PUT',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
    deleteManualEntry: builder.mutation<
      boolean,
      { userId: number; id: number }
    >({
      query: ({ userId, id }) => ({
        url: `/user/${userId}/manual-entry/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MONTH' }, { type: 'USER_YEAR' }],
    }),
  }),
});

export const {
  useCreateManualEntryMutation,
  useUpdateManualEntryMutation,
  useDeleteManualEntryMutation,
} = manualEntryApi;
