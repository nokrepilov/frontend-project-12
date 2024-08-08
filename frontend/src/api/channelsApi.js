import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import ROUTES from '../utils/routes.js';

import { getItemStorage } from '../utils/authLocalStorage.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ROUTES.channelsApi(),
    prepareHeaders: (headers) => {
      const userId = getItemStorage();

      if (userId && userId.token) {
        headers.set('Authorization', `Bearer ${userId.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;
