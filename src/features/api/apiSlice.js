
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Define emptyApi
export const emptyApi = createApi({
  reducerPath: 'api', // Unique reducer path for emptyApi
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["test"],
  endpoints: builder => ({})
});

// Define apiSlice
export const apiSlice = createApi({
  reducerPath: 'api2', // Unique reducer path for apiSlice
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/',
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
  tagTypes: ['Post', 'User', "test"],
  endpoints: builder => ({})
});