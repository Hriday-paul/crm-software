/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import Rout from '../../routs/Rout';
import { add_group_type } from '../../pages/Dashboard/Crm/Client/Template/AddClientGroup';
import { client_group_type, client_types } from './Types';
import { login_input_types } from '../../pages/Login/Login';

const apiUrl = import.meta.env.VITE_API_URL as string;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['clientGroups', 'clients'],
    baseQuery: async (args, api, extraOptions) => {
        // Fetch base query with interceptors
        const baseQueryWithInterceptors = fetchBaseQuery({
            baseUrl: apiUrl,
            credentials: 'include',
        });

        // Make the request
        const result = await baseQueryWithInterceptors(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            Rout.navigate('/login')
        }
        return result;
    },
    endpoints: (builder) => ({

        login: builder.mutation<{ message: string, user: { user_name: string, role: 'admin' | 'user' } }, login_input_types>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            })
        }),

        clientGroups: builder.query<client_group_type[], void>({
            query: () => '/client-groups',
            providesTags: ['clientGroups']
        }),
        addClientGroup: builder.mutation<{ message: string }, add_group_type>({
            query: ({ grp_name, description }) => ({
                url: `/client-groups`,
                method: 'POST',
                body: { name: grp_name, description }
            }),
            invalidatesTags: ['clientGroups']
        }),

        addClient: builder.mutation<{ message: string }, any>({
            query: (data) => ({
                url: '/clients',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['clients']
        }),

        clients: builder.query<{ collections: client_types[], count: { total: number }[] }, {current_page : number, limit : number; search : string}>({
            query: ({current_page, limit, search}) => `/clients?current_page=${current_page}&limit=${limit}&search=${search}`,
            providesTags: ['clients']
        }),

    })
})

export const { useAddClientGroupMutation, useClientGroupsQuery, useAddClientMutation, useLoginMutation, useClientsQuery } = baseApi;

export const reduxApi = baseApi;







export default baseApi;

