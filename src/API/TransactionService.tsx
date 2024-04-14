import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";



const URL = 'http://localhost:3001/'
// @ts-ignore
export const transactionAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllTransactions: builder.query({
      query: (limit = 10) => `/transactions?deleted=false`,
      providesTags: result => ['Transactions']
    }),


    //получение транзакции по id
    getTransactionById: builder.query({
      query: (id) => `/transactions?id=${id}`,
    }),

    //удаление транзакции (добавление флага deleted)
    softDeleteTransaction: builder.mutation({
      query:(id) => ({
        url: `/transactions/${id}`,
        method: 'PATCH',
        body: {deleted: "true"},
      }),
      invalidatesTags: ['Transactions']
    }),

    restoreAllTransactions: builder.mutation({
      query: () => ({
        url: '/transactions',
        method: 'PATCH',
        body: { deleted: "false" },
      }),
      invalidatesTags: ['Transactions']
    }),


    getCurrentBalance: builder.query({
      query: () => '/transactions',
      transformResponse: (response) => {
        // Вычисление текущего баланса на основе данных транзакций
        const transactions = response as ITransaction[];
        const balance = transactions.reduce((acc, curr) => {
          if (curr.type === 'доход') {
            return acc + curr.amount;
          } else {
            return acc - curr.amount;
          }
        }, 0);
        return balance;
      },
    }),
  }),
})


export const {
  useGetAllTransactionsQuery,
  useRestoreAllTransactionsMutation,
  useGetTransactionByIdQuery,
  useGetCurrentBalanceQuery,
  useSoftDeleteTransactionMutation
} = transactionAPI
