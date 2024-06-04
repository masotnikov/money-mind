import axios, { AxiosResponse } from 'axios';
import { ITransaction } from '../@types/types';

const URL = 'http://money-mind-zeta.vercel.app/';

const restoreDeletedTransactions = async () => {
  try {
    const response: AxiosResponse<ITransaction[]> = await axios.get(`${URL}transactions?deleted=true`);
    const deletedTransactions: ITransaction[] = response.data;

    const restorePromises: Promise<AxiosResponse<ITransaction>>[] = deletedTransactions.map((transaction: ITransaction) => {
      return axios.patch(`${URL}transactions/${transaction.id}`, { deleted: 'false' });
    });

    await Promise.all(restorePromises);
    console.log('Транзакции успешно восстановлены');
  } catch (error) {
    console.error('Ошибка восстановления транзакций', error);
  }
};

export default restoreDeletedTransactions;
