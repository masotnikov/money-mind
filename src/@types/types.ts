import {ReactNode} from "react";

export interface ITransaction {
  id?: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface IModal {
  children: ReactNode;
  modal: boolean;
  setModal: (modalState: boolean) => void;
}


export interface IOption {
  name: string;
  value: string;
  disabled?: boolean
}

export interface ISelect {
  name?: string
  register?: any
  options: IOption[];
  value?: string;
  onChange: (value: string) => void;
}
