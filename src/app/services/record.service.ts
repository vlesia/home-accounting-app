import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Category } from '../models/history.model';
import { Event } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private http = inject(HttpClient);

  public saveEvent(event: Omit<Event, 'id'>): Observable<Event> {
    return this.http
      .post<Event>('/events', event)
      .pipe(
        catchError(() =>
          throwError(
            () => new Error('Unable to save event. Please try again later.'),
          ),
        ),
      );
  }

  public saveCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http
      .post<Category>('/categories', category)
      .pipe(
        catchError(() =>
          throwError(
            () => new Error('Unable to save category. Please try again later.'),
          ),
        ),
      );
  }

  public updateCategory(
    category: Omit<Category, 'id' | 'userId'>,
    categoryId: string,
  ): Observable<Category> {
    return this.http
      .patch<Category>(`/categories/${categoryId}`, category)
      .pipe(
        catchError(() =>
          throwError(
            () =>
              new Error('Unable to update category. Please try again later.'),
          ),
        ),
      );
  }

  public deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`/categories/${categoryId}`).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Unable to delete category. Please try again later.'),
        );
      }),
    );
  }
}
