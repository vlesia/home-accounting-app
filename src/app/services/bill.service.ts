import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import {
  CalculatedAccountValue,
  ExchangeRateResponse,
  ExchangeRates,
  Rate,
  UserBill,
} from '../models/bill.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  public apiUrl = 'https://open.er-api.com/v6/latest/USD';

  private userService = inject(UserService);
  private http = inject(HttpClient);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public getCalculatedAccountValue(): Observable<CalculatedAccountValue> {
    return forkJoin({
      rates: this.getExchangeRates(),
      bill: this.getUserAccount(),
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

  private getExchangeRates(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRateResponse>(this.apiUrl).pipe(
      map(({ time_last_update_utc: date, rates }) => ({
        date,
        rates: ['USD', 'EUR', 'UAH'].map((currency) => ({
          currency,
          rate: rates[currency],
        })),
      }))
    );
  }

  private getUserAccount(): Observable<UserBill[]> {
    return this.http.get<UserBill[]>(`/bill?userId=${this.user!.id}`);
  }
}
