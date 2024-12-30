import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Type } from '@angular/core';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { catchError, filter, Observable, switchMap, throwError } from 'rxjs';

import { UserService } from './user.service';
import { User } from '../models/user.model';
import { FormEvent } from '../models/record.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  private userService = inject(UserService);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public openDialog<T>(component: Type<T>): Observable<Event> {
    const dialogRef = this.dialog.open(component, { autoFocus: false });

    return dialogRef.afterClosed().pipe(
      filter((val) => val !== null && val !== undefined),
      switchMap((val) => this.saveEvent(val))
    );
  }

  private saveEvent(formEvent: FormEvent): Observable<Event> {
    const event = {
      type: formEvent.type,
      amount: +formEvent.amount,
      category: +formEvent.category,
      date: this.getFormattedCurrentDate(),
      description: formEvent.description,
      userId: this.user!.id
    };

    return this.http
      .post<Event>('/events', event)
      .pipe(
        catchError(() =>
          throwError(
            () => new Error('Unable to save event. Please try again later.')
          )
        )
      );
  }

  private getFormattedCurrentDate(): string {
    return format(new Date(), 'dd.MM.yyyy HH:mm:ss');
  }
}
