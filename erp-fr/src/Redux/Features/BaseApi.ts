/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';
import Rout from '../../routs/Rout';
import { add_group_type } from '../../pages/Dashboard/Crm/Client/Template/AddClientGroup';
import { client_group_type } from './Types';

const apiUrl = import.meta.env.VITE_API_URL as string;

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['clientGroups', 'clients'],
    baseQuery: async (args, api, extraOptions) => {
        // Fetch base query with interceptors
        const baseQueryWithInterceptors = fetchBaseQuery({
            baseUrl: apiUrl,
        });

        // Make the request
        const result = await baseQueryWithInterceptors(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            Rout.navigate('/login')
        }
        return result;
    },
    endpoints: (builder) => ({
        clientGroups : builder.query<client_group_type[], void>({
            query : () => '/client-groups',
            providesTags: ['clientGroups']
        }),
        addClientGroup: builder.mutation<{message : string}, add_group_type>({
            query: ({ grp_name, description }) => ({
                url: `/client-groups`,
                method: 'POST',
                body: { name : grp_name, description }
            }),
            invalidatesTags: ['clientGroups']
        }),

        addClient : builder.mutation<{message : string}, any>({
            query : (data) => ({
                url: '/clients',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['clients']
        })
        
    })
})

export const { useAddClientGroupMutation, useClientGroupsQuery, useAddClientMutation } = baseApi;

export const reduxApi = baseApi;







export default baseApi;

