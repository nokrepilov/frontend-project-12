import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import ROUTES from '../utils/routes.js';

import { getItemStorage } from '../utils/authLocalStorage.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ROUTES.messagesApi(),
    prepareHeaders: (headers) => {
      const userId = getItemStorage();

      if (userId && userId.token) {
        headers.set('Authorization', `Bearer ${userId.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage,
      }),
      providesTags: ['Message'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        providesTags: ['Message'],
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
