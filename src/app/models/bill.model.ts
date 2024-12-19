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
  date: string;
  rates: Rate[];
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
