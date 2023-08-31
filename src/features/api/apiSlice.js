import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5001',
        prepareHeaders: (headers, { getState }) => {
            // Get token from store (userSlice)
            const token = getState().user.currentUser?.token;
      
            // Add token to headers
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
      
            return headers;
          },

    }),
    tagTypes: ['Post', 'User'],
    endpoints: builder => ({})
})