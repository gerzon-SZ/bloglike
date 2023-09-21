import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { testApi } from '../features/api/test';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Specify reducerPath for apiSlice
        [testApi.reducerPath]: testApi.reducer, // Specify reducerPath for testApi
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([apiSlice.middleware, testApi.middleware]),
    devTools: true
});

setupListeners(store.dispatch);
export default store;
