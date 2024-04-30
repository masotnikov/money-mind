import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";


const URL = 'http://localhost:3001/'

export const transactionAPI = createApi({
  reducerPath: 'transactionReducer',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllTransactions: builder.query({
      query: (limit = 10) => `/transactions?deleted=false`,
      providesTags: result => ['Transactions'],
      transformResponse: (res) => {
        // @ts-ignore
        return res.map(item => ({
          ...item,
          date: item.date
            .split('-')
            .reverse()
            .join('-')
        }))
          .reverse();
      }
    }),

    //получение транзакции по id
    getTransactionById: builder.query({
      query: (id) => `/transactions?id=${id}`,
    }),

    //удаление транзакции (добавление флага deleted)
    softDeleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'PATCH',
        body: {deleted: "true"},
      }),
      invalidatesTags: ['Transactions']
    }),

    addNewTransaction: builder.mutation({
      query: (newTransactions: ITransaction) => ({
        url: `/transactions`,
        method: 'POST',
        body: {
          id: Date.now().toString(),
          ...newTransactions,
          deleted: "false"
        }
      }),
      invalidatesTags: ['Transactions'],
      transformResponse: (res) => {
        console.log(res)
      }
    }),
  }),
})


export const {
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useSoftDeleteTransactionMutation,
  useAddNewTransactionMutation
} = transactionAPI
