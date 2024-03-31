import axios from "axios";
import {ITransaction} from "../@types/types";


export default class TransactionService {
 static async getTransactions (limit? : number) : Promise<ITransaction[]>{
    const response = await axios.get<ITransaction[]>(`http://localhost:3000/transactions`, {
      params: {
        _limit: limit,
      }
    });
    return response.data
 }

  static async getLastTransactions (limit = 3) : Promise<ITransaction[]>{
    const response = await axios.get<ITransaction[]>(`http://localhost:3000/transactions`, {
      params: {
        _limit: limit,
        _sort: '-id',
      }
    });
    return response.data
  }

  static async getCurrentBalance(): Promise<number> {
    const transactions = await this.getTransactions();
    const balance = transactions.reduce((acc, curr) => {
      if (curr.type === 'доход') {
        return acc + curr?.amount;
      } else {
        return acc - curr?.amount;
      }
    }, 0);
    return balance;
  }
}