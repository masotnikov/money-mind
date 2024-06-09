import axios, { AxiosResponse } from 'axios';
import { ITransaction } from '../@types/types';
// import {backendURL} from '../services/BackendURL'

const restoreDeletedTransactions = async () => {
  try {
    const response: AxiosResponse<ITransaction[]> = await axios.get(`https://6664b386932baf9032abdc33.mockapi.io/transactions?deleted=true`);
    const deletedTransactions: ITransaction[] = response.data;

    const restorePromises: Promise<AxiosResponse<ITransaction>>[] = deletedTransactions.map((transaction: ITransaction) => {
      return axios.put(`https://6664b386932baf9032abdc33.mockapi.io/transactions/${transaction.id}`, { deleted: 'false' });
    });

    await Promise.all(restorePromises);
    console.log('Транзакции успешно восстановлены');
  } catch (error) {
    console.error('Ошибка восстановления транзакций', error);
  }
};

export default restoreDeletedTransactions;
