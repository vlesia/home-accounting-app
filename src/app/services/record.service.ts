import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Category } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private http = inject(HttpClient);

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
}
