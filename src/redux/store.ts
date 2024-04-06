import { configureStore } from '@reduxjs/toolkit';
import { API } from '../API/TransactionService'

const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    // Другие редукторы вашего приложения, если есть
  },
  // Добавьте middleware для обработки запросов
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
});

export default store;
