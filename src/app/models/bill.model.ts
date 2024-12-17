export interface UserBill {
  value: number;
  currency: string;
  userId: number;
}

export interface Rate {
  currency: string;
  rate: number;
}

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Rate[];
  success: boolean;
  timestamp: number;
}

export interface UserBalance {
  currency: string;
  amount: number;
}

export interface ExchangeData {
  currency: string;
  rate: number;
  date: string;
}

export interface CalculatedAccountValue {
  userBalances: UserBalance[];
  exchangeData: ExchangeData[];
}
