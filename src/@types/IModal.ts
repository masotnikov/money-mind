import {ReactNode} from "react";

export interface IModal {
  children: ReactNode;
  modal: boolean;
  setModal: (modalState: boolean) => void;
}