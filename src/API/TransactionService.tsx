import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";
import {balanceProcessing, convertToEuropeanFormat} from "../utils/utils";


export const URL = 'http://localhost:3001/'

export const transactionAPI = createApi({
  reducerPath: 'transactionReducer',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Transactions', 'BalanceAndExpenses'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllTransactions: builder.query({
      query: (month = '') => {
        return {
          url: `/transactions?deleted=false`
        }
      },
      providesTags: result => ['Transactions'],
      // transformResponse: (response, meta, arg) => {
      //   const transactions = response as ITransaction
      //   return transactions
      // }
    }),

      // providesTags: result => ['Transactions'],
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
          ...newTransactions,
          date: convertToEuropeanFormat(newTransactions.date),
          deleted: "false",
        }
      }),
      invalidatesTags: ['Transactions', 'BalanceAndExpenses'],

    }),

    getBalanceAndExpenses: builder.query({
      query: () => '/transactions',
      providesTags: ['BalanceAndExpenses'],
      transformResponse: (response) => {
        const transactions = response as ITransaction[];
        return balanceProcessing(transactions)
      },
    })
  }),
})


export const {
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useSoftDeleteTransactionMutation,
  useAddNewTransactionMutation,
  useGetBalanceAndExpensesQuery,
} = transactionAPI
