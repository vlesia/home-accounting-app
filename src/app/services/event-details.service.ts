import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category, EventDetails, Event } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class EventDetailsService {
  private http = inject(HttpClient);

  public getEventById(id: string): Observable<EventDetails> {
    return this.http.get<Event[]>(`/events?id=${id}`).pipe(
      switchMap((event) => {
        return this.getCategoryById(event[0].category).pipe(
          map((category) => ({
            ...event[0],
            category: category.name,
          }))
        );
      })
    );
  }

  private getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category[]>(`/categories?id=${id.toString()}`).pipe(
      map((categories) => {
        return categories[0];
      })
    );
  }
}
