import { configureStore } from '@reduxjs/toolkit';
import { transactionAPI } from '../services/TransactionService';
import { goalsAPI } from "../services/GoalsService";

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
