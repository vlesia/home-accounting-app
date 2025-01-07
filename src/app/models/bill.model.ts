export interface UserBill {
  value: number;
  currency: string;
  userId: string;
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

export interface ExchangeRateResponse {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: string;
  rates: {
    [currencyCode: string]: number;
  };
}
