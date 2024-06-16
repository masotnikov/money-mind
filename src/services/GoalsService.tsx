import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {backendURL} from './BackendURL'
import {IGoal} from "../@types/IGoal";


export const goalsAPI = createApi({
  reducerPath: 'goalsReducer',
  baseQuery: fetchBaseQuery({baseUrl: backendURL}),
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
        method: 'PUT',
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
