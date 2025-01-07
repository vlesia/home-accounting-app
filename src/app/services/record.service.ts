import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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
}
