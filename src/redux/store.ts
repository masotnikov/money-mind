import { configureStore } from '@reduxjs/toolkit';
import { transactionAPI } from '../API/TransactionService';
import { goalsAPI } from "../API/GoalsService";

const store = configureStore({
  reducer: {
    [transactionAPI.reducerPath]: transactionAPI.reducer,
    [goalsAPI.reducerPath]: goalsAPI.reducer,
  },
  // Добавьте middleware для обработки запросов
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    transactionAPI.middleware,
    goalsAPI.middleware
  ),
});

export default store;
