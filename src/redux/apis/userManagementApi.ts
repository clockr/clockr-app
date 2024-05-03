import { appApi } from './index';
import { UserType } from '../../types/UserType';
import { ContractType } from '../../types/ContractType';

export const userManagementApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query<UserType[], void>({
      query: () => ({
        url: `/user-management`,
        method: 'GET',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      providesTags: [{ type: 'USER_MANAGEMENT_USER_LIST', id: 'LIST' }],
    }),
    getUser: builder.query<UserType, string>({
      query: (id) => ({
        url: `/user-management/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      providesTags: (result, error, arg) => [
        { type: 'USER_MANAGEMENT_USER', id: result.id },
      ],
    }),
    createUser: builder.mutation<UserType, Partial<UserType>>({
      query: (payload) => ({
        url: `/user-management`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: [{ type: 'USER_MANAGEMENT_USER_LIST', id: 'LIST' }],
    }),
    updateUser: builder.mutation<
      UserType,
      { id: number; payload: Partial<UserType> }
    >({
      query: ({ id, payload }) => ({
        url: `/user-management/${id}`,
        method: 'PUT',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [
        { type: 'USER_MANAGEMENT_USER_LIST', id: 'LIST' },
        { type: 'USER_MANAGEMENT_USER', id: arg.id },
        { type: 'USER_MONTH' },
        { type: 'USER_YEAR' },
      ],
    }),
    deleteUser: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `/user-management/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [
        { type: 'USER_MANAGEMENT_USER_LIST', id: 'LIST' },
        { type: 'USER_MANAGEMENT_USER', id: arg },
      ],
    }),
    createContract: builder.mutation<
      UserType,
      { userId: number; payload: Partial<ContractType> }
    >({
      query: ({ userId, payload }) => ({
        url: `/user-management/${userId}/contract`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [
        { type: 'USER_MANAGEMENT_USER', id: arg.userId },
        { type: 'USER_MONTH' },
        { type: 'USER_YEAR' },
      ],
    }),
    updateContract: builder.mutation<
      UserType,
      { userId: number; id: number; payload: Partial<ContractType> }
    >({
      query: ({ userId, id, payload }) => ({
        url: `/user-management/${userId}/contract/${id}`,
        method: 'PUT',
        body: payload,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [
        { type: 'USER_MANAGEMENT_USER', id: arg.userId },
        { type: 'USER_MONTH' },
        { type: 'USER_YEAR' },
      ],
    }),
    deleteContract: builder.mutation<boolean, { userId: number; id: number }>({
      query: ({ userId, id }) => ({
        url: `/user-management/${userId}/contract/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [
        { type: 'USER_MANAGEMENT_USER', id: arg.userId },
        { type: 'USER_MONTH' },
        { type: 'USER_YEAR' },
      ],
    }),
    lockMonth: builder.mutation<
      boolean,
      { userId: number; year: number; month: number }
    >({
      query: ({ userId, year, month }) => ({
        url: `/user-management/${userId}/lock-month/${year}/${month}`,
        method: 'POST',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [{ type: 'USER_MONTH' }],
    }),
    unlockMonth: builder.mutation<
      boolean,
      { userId: number; year: number; month: number }
    >({
      query: ({ userId, year, month }) => ({
        url: `/user-management/${userId}/lock-month/${year}/${month}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: (result, error, arg) => [{ type: 'USER_MONTH' }],
    }),
  }),
});

export const {
  useListUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateContractMutation,
  useUpdateContractMutation,
  useDeleteContractMutation,
  useLockMonthMutation,
  useUnlockMonthMutation,
} = userManagementApi;
