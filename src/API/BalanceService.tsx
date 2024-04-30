import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ITransaction} from "../@types/types";

const URL = 'http://localhost:3001/';

export const balanceAPI = createApi({
  reducerPath: 'balanceReducer',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: (builder) => ({
    getCurrentBalance: builder.query({
      query: () => '/transactions',
      transformResponse: (response) => {
        // Вычисление текущего баланса на основе данных транзакций
        const transactions = response as ITransaction[];
        const balance = transactions.reduce((acc, curr) => {
          if (curr.type === 'Доход') {
            return acc + curr.amount;
          } else {
            return acc - curr.amount;
          }
        }, 0);
        return balance;
      },
    })
  })
})


export const {
  useGetCurrentBalanceQuery
} = balanceAPI