import { emptyApi } from "./apiSlice"; 

export const testApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    test: build.query({
      query: ({ page = 1, limit = 10 }) => {
        console.log(page, limit, "page, limit");
        return { url: `test?page=${page}&limit=${limit}` };
      },
      providesTags: ["test"],
      transformErrorResponse: (result) => console.log(result),
    }),
  }),
  overrideExisting: false,
});

export const { useTestQuery, usePrefetch } =
  testApi;
