import {ReactNode} from "react";

export interface ITransaction {
  id?: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  location?: ITransactionLocation
}

export interface ITransactionLocation {
  name: string;
  coordinates: {latitude : number, longitude: number}
}

export interface IModal {
  children: ReactNode;
  modal: boolean;
  setModal: (modalState: boolean) => void;
}


export interface IOption {
  name: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface ISelect {
  name?: string
  register?: any
  options: IOption[];
  value?: string;
  onChange: (value: string) => void;
}

export interface IGoal {
  id?: string
  title: string,
  description: string,
  amount: number,
  progress: number,
  status: string
}

export interface IFilter {
  sort: string;
  query: string;
  month: string
}

export interface IBalanceAndExpenses {
  balance: number;
  expenses: number;
  saving: number;
  income: number;
}