export interface Category {
  id: string;
  name: string;
  capacity: number;
  userId: string;
}

export type TransactionType = 'income' | 'outcome';

export interface Event {
  id: string;
  type: TransactionType;
  amount: number;
  category: number;
  date: string;
  description: string;
  userId: string;
}

export interface UserExpenses {
  id: string,
  amount: number;
  date: string;
  category: string;
  type: string;
}

export interface EventDetails {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description: string;
  userId: string;
}

export interface dataChart {
  name: string;
  y: number;
}
