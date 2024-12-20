import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';

import { Category, Event, UserExpenses } from '../models/history.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  public user: User | null = this.userService.getUser();

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
          const { id, userId, ...eventInfo } = event;
          return {
            amount: event.amount,
            date: event.date,
            category: category!.name,
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
