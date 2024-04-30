import { configureStore } from '@reduxjs/toolkit';
import { transactionAPI } from '../API/TransactionService'
import {balanceAPI} from "../API/BalanceService";

const store = configureStore({
  reducer: {
    [transactionAPI.reducerPath]: transactionAPI.reducer,
    [balanceAPI.reducerPath]: balanceAPI.reducer
    // Другие редукторы вашего приложения, если есть
  },
  // Добавьте middleware для обработки запросов
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    transactionAPI.middleware,
    balanceAPI.middleware
  ),
});

export default store;
