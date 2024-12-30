export interface Category {
  id: string;
  name: string;
  capacity: number;
  userId: number;
}

export type TransactionType = 'income' | 'outcome';

export interface Event {
  id: string;
  type: TransactionType;
  amount: number;
  category: number;
  date: string;
  description: string;
  userId: number;
}

export interface UserExpenses {
  amount: number;
  date: string;
  category: string;
  type: string;
  eventInfo: EventInfo;
}

export interface EventInfo {
  type: 'income' | 'outcome';
  amount: number;
  category: number;
  date: string;
  description: string;
}
