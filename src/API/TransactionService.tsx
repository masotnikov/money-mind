import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";



const URL = 'http://localhost:3001/'

export const transactionAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllTransactions: builder.query({
      query: (limit = 10) => `/transactions?deleted=false`,
      providesTags: result => ['Transactions'],
      transformResponse: (res) => {
        // @ts-ignore
        return res.reverse();
      }
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

    addNewTransaction: builder.mutation({
      query:(newTransactions : ITransaction) => ({
        url: `/transactions`,
        method: 'POST',
        body: {
          id: Date.now().toString(),
          ...newTransactions,
          deleted: "false"
        }
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
  useGetTransactionByIdQuery,
  useGetCurrentBalanceQuery,
  useSoftDeleteTransactionMutation,
  useAddNewTransactionMutation
} = transactionAPI
