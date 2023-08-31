import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/v1/user',
            transformResponse: responseData => {
              const loadedUsers = responseData.map(user => ({
                ...user,
                name: user.firstName + ' ' + user.lastName,
                id: user._id
              }))
              return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        login: builder.mutation({
            query: (credentials) => ({
              url: `/api/v1/user/login`,
              method: 'POST',
              body: credentials,
            }),
          }),
    })
})

export const {
    useGetUsersQuery,
    useLoginMutation
} = usersApiSlice

// Config slice
export const userSlice = createSlice({
    name: 'user',
    initialState: {currentUser: null, userId: null},
    reducers: {
      logout: (state) => {
        state.currentUser = null;
        state.errorMessage = '';
      },
    },
    extraReducers: (builder) => {
      builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
    },
  });
  
  // Export actions
  export const { logout } = userSlice.actions;
  
  // Select state currentUser from slice
  export const selectUser = (state) => state.user.currentUser;
 
  // Export reducer
  export default userSlice.reducer;
  
