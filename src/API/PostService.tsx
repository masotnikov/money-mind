import axios from "axios";
import {ITransaction} from "../@types/types";

export default class PostService {
 static async getTransactions (){
    return await axios.get(`http://localhost:3000/transactions`);
 }
}