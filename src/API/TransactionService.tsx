import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";


export const URL = 'http://localhost:3001/'

export const transactionAPI = createApi({
  reducerPath: 'transactionReducer',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  tagTypes: ['Transactions', 'BalanceAndExpenses'],
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
          ...newTransactions,
          deleted: "false"
        }
      }),
      invalidatesTags: ['Transactions', 'BalanceAndExpenses'],
    }),

    getBalanceAndExpenses: builder.query({
      query: () => '/transactions',
      providesTags: ['BalanceAndExpenses'],
      transformResponse: (response) => {
        const transactions = response as ITransaction[];
        let balance: number = 0;
        let expenses: number = 0;
        for (let i = 0; i < transactions.length; i++) {
          const transaction: ITransaction = transactions[i];
          if (transaction.type === 'Расход') {
            expenses += transaction.amount
          }
          if (transaction.type === 'Доход') {
            balance += transaction.amount;
          } else {
            balance -= transaction.amount;
          }
        }
        return {balance, expenses};
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
