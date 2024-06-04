import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IGoal} from "../@types/types";


export const URL = 'http://money-mind-zeta.vercel.app/'

export const goalsAPI = createApi({
  reducerPath: 'goalsReducer',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Goals'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllGoals: builder.query<IGoal[], void>({
      query: () => `/goals?deleted=false`,
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

    addNewGoal: builder.mutation({
      query: (newGoal: IGoal) => ({
        url: `/goals`,
        method: 'POST',
        body: {
          ...newGoal,
          deleted: "false",
          status: "Активно",
        },
      }),
      invalidatesTags: ['Goals']
    }),


  }),
})

export const {
  useGetAllGoalsQuery,
  useSoftDeleteGoalMutation,
  useAddNewGoalMutation
} = goalsAPI
