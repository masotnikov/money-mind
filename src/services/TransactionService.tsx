import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IBalanceAndExpenses, ITransaction} from "../@types/types";
import {balanceProcessing, convertToEuropeanFormat} from "../utils/utils";
import {Config} from "../config";


export const transactionAPI = createApi({
  reducerPath: 'transactionReducer',
  baseQuery: fetchBaseQuery({baseUrl: Config}),
  tagTypes: ['Transactions', 'BalanceAndExpenses'],
  endpoints: (builder) => ({

    //получение всех транзакций
    getAllTransactions: builder.query<ITransaction[], void>({
      query: () => {
        return {
          url: `/transactions?deleted=false`
        }
      },
      providesTags: result => ['Transactions'],
    }),

    //получение транзакции по id
    getTransactionById: builder.query<ITransaction, string>({
      query: (id: string) => `/transactions?id=${id}`,
      transformResponse: (response: ITransaction[]) => {
        if (response.length > 0) {
          return response[0];
        } else {
          throw new Error('Transaction not found');
        }
      }
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

    addNewTransaction: builder.mutation<ITransaction, ITransaction>({
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

    getBalanceAndExpenses: builder.query<IBalanceAndExpenses, void>({
      query: () => '/transactions',
      providesTags: ['BalanceAndExpenses'],
      transformResponse: (response: ITransaction[]) => {
        return balanceProcessing(response)
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
