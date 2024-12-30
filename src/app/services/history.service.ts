import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import {
  Category,
  dataChart,
  Event,
  UserExpenses,
} from '../models/history.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`/categories?userId=${this.user!.id}`);
  }

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`/events?userId=${this.user!.id}`);
  }

  public getCombinedData(): Observable<UserExpenses[]> {
    return forkJoin({
      categories: this.getCategories(),
      events: this.getEvents(),
    }).pipe(
      map(({ categories, events }) => {
        const combinedData = events.map((event) => {
          const category = categories.find((cat) => +cat.id === event.category);
          return {
            id: event.id,
            amount: event.amount,
            date: event.date,
            category: category!.name,
            type: event.type,
          };
        });

        return combinedData;
      }),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              'Something went wrong while fetching the data. Please try again later.'
            )
        );
      })
    );
  }

  public getFilteredOutcomeEvents(): Observable<dataChart[]> {
    return forkJoin({
      categories: this.getCategories(),
      events: this.getEvents(),
    }).pipe(
      map(({ categories, events }) => {
        const outcomeEvents = events.filter(
          (event) => event.type === 'outcome'
        );

        const categoryTotals = outcomeEvents.reduce((acc, event) => {
          const category = categories.find(
            (cat) => +cat.id === +event.category
          );
          if (category) {
            acc[category.name] = (acc[category.name] || 0) + event.amount;
          }
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryTotals).map(([name, y]) => ({ name, y }));
      })
    );
  }
}









