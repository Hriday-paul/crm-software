/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import Rout from '../../routs/Rout';
import { add_group_type } from '../../pages/Dashboard/Crm/Client/Template/AddClientGroup';
import { account_type, client_group_type, client_types } from './Types';
import { login_input_types } from '../../pages/Login/Login';

const apiUrl = import.meta.env.VITE_API_URL as string;
export const base_url = import.meta.env.VITE_BASE_URL!;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['clientGroups', 'clients', 'accounts'],
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

        clientGroups: builder.query<client_group_type[], {search ?: string}>({
            query: ({search}) => `/client-groups?search=${search}`,
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

        editClientGroup: builder.mutation<{ message: string }, {id : number; data : {name : string, description : string}}>({
            query: ({data, id}) => ({
                url: `/client-groups/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['clientGroups']
        }),

        deleteClientGroup: builder.mutation<{ message: string }, {id : number}>({
            query: ({id}) => ({
                url: `/client-groups/${id}`,
                method: 'DELETE',
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
        editClient: builder.mutation<{ message: string }, {id : number, data : any}>({
            query: ({data, id}) => ({
                url: `/clients/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['clients']
        }),

        deleteClient: builder.mutation<{ message: string }, {id : number}>({
            query: ({id}) => ({
                url: `/clients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['clients']
        }),

        clients: builder.query<{ collections: client_types[], count: { total: number }[] }, {current_page : number, limit : number; search : string}>({
            query: ({current_page, limit, search}) => `/clients?current_page=${current_page}&limit=${limit}&search=${search}`,
            providesTags: ['clients']
        }),

        //-------------account----------
        accounts: builder.query<{ collections: account_type[], count: { total: number }[] }, {current_page : number, limit : number; search : string}>({
            query: ({current_page, limit, search}) => `/accounts?current_page=${current_page}&limit=${limit}&search=${search}`,
            providesTags: ['accounts']
        }),
        addNewAccount: builder.mutation<{ message: string }, any>({
            query: (data) => ({
                url: '/accounts',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['accounts']
        }),
        editAccount: builder.mutation<{ message: string }, {id : number, data : any}>({
            query: ({data, id}) => ({
                url: `/accounts/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['accounts']
        }),
        deleteAccount: builder.mutation<{ message: string }, {id : number}>({
            query: ({id}) => ({
                url: `/accounts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['accounts']
        }),

    })
})

export const { useAddClientGroupMutation, useClientGroupsQuery, useAddClientMutation, useLoginMutation, useClientsQuery, useEditClientMutation, useDeleteClientMutation, useEditClientGroupMutation, useDeleteClientGroupMutation, useAccountsQuery, useDeleteAccountMutation, useAddNewAccountMutation, useEditAccountMutation} = baseApi;

export const reduxApi = baseApi;







export default baseApi;

