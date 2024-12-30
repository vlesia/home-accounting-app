import { TransactionType } from "./history.model";

export interface FormEvent {
  category: number;
  type: TransactionType;
  amount: string;
  description: string;
}
