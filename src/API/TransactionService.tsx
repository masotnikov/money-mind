//  import axios from "axios";
// import {ITransaction} from "../@types/types";
//
//
// export default class TransactionService {
//  static async getTransactions (limit? : number) : Promise<ITransaction[]>{
//     const response = await axios.get<ITransaction[]>(`http://localhost:3000/transactions`, {
//       params: {
//         _limit: limit,
//       }
//     });
//     return response.data
//  }
//
//   static async getLastTransactions (limit = 3) : Promise<ITransaction[]>{
//     const response = await axios.get<ITransaction[]>(`http://localhost:3000/transactions`, {
//       params: {
//         _limit: limit,
//         _sort: '-id',
//       }
//     });
//     return response.data
//   }
//
//   static async getCurrentBalance(): Promise<number> {
//     const transactions = await this.getTransactions();
//     const balance = transactions.reduce((acc, curr) => {
//       if (curr.type === 'доход') {
//         return acc + curr?.amount;
//       } else {
//         return acc - curr?.amount;
//       }
//     }, 0);
//     return balance;
//   }
// }

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";

const URL = 'http://localhost:3001/'
export const transactionAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: (limit) => `/transactions?_limit=${limit}`,
    }),

    getLastTransactions: builder.query({
      query: (limit = 3) => ({
        url: `/transactions`,
        params: {
          _limit: limit,
          _sort: '-id',
        },
      }),
    }),

    getTransactionById: builder.query({
      query: (id) => `/transactions?id=${id}`,
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
  useGetLastTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetCurrentBalanceQuery
} = transactionAPI
