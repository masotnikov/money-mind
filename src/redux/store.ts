import { configureStore } from '@reduxjs/toolkit';
import { transactionAPI } from '../services/TransactionService';
import { goalsAPI } from "../services/GoalsService";
  import { useDispatch } from "react-redux";
import theme from './theme/slice'

const store = configureStore({
  reducer: {
    [transactionAPI.reducerPath]: transactionAPI.reducer,
    [goalsAPI.reducerPath]: goalsAPI.reducer,
    theme
  },
  // Добавьте middleware для обработки запросов
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    transactionAPI.middleware,
    goalsAPI.middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store;



