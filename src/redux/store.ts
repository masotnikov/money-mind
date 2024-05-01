import { configureStore } from '@reduxjs/toolkit';
import { transactionAPI } from '../API/TransactionService'

const store = configureStore({
  reducer: {
    [transactionAPI.reducerPath]: transactionAPI.reducer,
    // Другие редукторы вашего приложения, если есть
  },
  // Добавьте middleware для обработки запросов
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    transactionAPI.middleware,
  ),
});

export default store;
