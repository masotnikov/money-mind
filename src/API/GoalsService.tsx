import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const URL = 'http://localhost:3001/'

export const goalsAPI = createApi({
  reducerPath: 'goalsReducer',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Goals'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllGoals: builder.query({
      query: (limit = 10) => `/goals?deleted=false`,
      providesTags: result => ['Goals'],
    }),

    softDeleteGoal: builder.mutation({
      query: (id) => ({
        url: `/goals/${id}`,
        method: 'PATCH',
        body: {deleted: "true"},
      }),
      invalidatesTags: ['Goals']
    }),
  }),
})

export const {
  useGetAllGoalsQuery,
  useSoftDeleteGoalMutation
} = goalsAPI
