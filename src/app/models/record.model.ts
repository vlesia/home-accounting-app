export type TransactionType = 'income' | 'outcome';

export interface FormEvent {
  category: number;
  type: TransactionType;
  amount: string;
  description: string;
}
