import axios from "axios";
import {ITransaction} from "../@types/types";


export default class PostService {
 static async getTransactions () : Promise<ITransaction[]>{
    const response = await axios.get<ITransaction[]>(`http://localhost:3000/transactions`);
    return response.data
 }
}