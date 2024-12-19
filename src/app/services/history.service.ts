import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import { Category, Event, UserExpenses } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private http = inject(HttpClient);

  public getCategories(userId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`/categories?userId=${userId}`);
  }

  public getEvents(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`/events?userId=${userId}`);
  }

  public getCombinedData(userId: number): Observable<UserExpenses[]> {
    return forkJoin({
      categories: this.getCategories(userId),
      events: this.getEvents(userId),
    }).pipe(
      map(({ categories, events }) => {
        const combinedData = events.map((event, index) => {
          const category = categories.find((cat) => +cat.id === event.category);
          const { id, userId, ...eventInfo } = event;
          return {
            index: index + 1,
            amount: event.amount,
            date: event.date,
            category: category ? category.name : 'Unknown',
            type: event.type,
            eventInfo,
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
}
