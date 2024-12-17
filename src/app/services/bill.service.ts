import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import {
  CalculatedAccountValue,
  ExchangeRates,
  Rate,
  UserBill,
} from '../models/bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private http = inject(HttpClient);

  getExchangeRates(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>('/currency');
  }

  getUserAccount(userId: number): Observable<UserBill[]> {
    return this.http.get<UserBill[]>(`/bill?userId=${userId}`);
  }

  getCalculatedAccountValue(
    userId: number
  ): Observable<CalculatedAccountValue> {
    return forkJoin({
      rates: this.getExchangeRates(),
      bill: this.getUserAccount(userId),
    }).pipe(
      map(({ rates, bill }) => {
        const userBalances = rates.rates.map((rate: Rate) => ({
          currency: rate.currency,
          amount: rate.rate * bill[0].value,
        }));

        const exchangeData = rates.rates.map((rate: Rate) => ({
          currency: rate.currency,
          rate: rate.rate,
          date: rates.date,
        }));

        return { userBalances, exchangeData };
      }),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              'Unable to calculate your account value. Please try again later.'
            )
        );
      })
    );
  }
}
