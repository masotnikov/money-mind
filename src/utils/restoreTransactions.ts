import axios, { AxiosResponse } from 'axios';
import { ITransaction } from '../@types/types';

const restoreTransactions = async () => {
  try {
    const response: AxiosResponse<ITransaction[]> = await axios.get('http://localhost:3001/transactions?deleted=true');
    const deletedTransactions: ITransaction[] = response.data;

    const restorePromises: Promise<AxiosResponse<ITransaction>>[] = deletedTransactions.map((transaction: ITransaction) => {
      return axios.patch(`http://localhost:3001/transactions/${transaction.id}`, { deleted: 'false' });
    });

    await Promise.all(restorePromises);
    console.log('Транзакции успешно восстановлены');
  } catch (error) {
    console.error('Ошибка восстановления транзакций', error);
  }
};

export default restoreTransactions;
