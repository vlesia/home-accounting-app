import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Type } from '@angular/core';
import { format } from 'date-fns';

import { FormEvent } from '../models/record.model';
import { catchError, filter, Observable, switchMap, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);
  //private userService = inject(UserService);

  // public get user(): User | null {
  //   return this.userService.getUser();
  // }

  public openDialog<T>(component: Type<T>): Observable<any> {
    //Event
    const dialogRef = this.dialog.open(component, { autoFocus: false });

    return dialogRef.afterClosed().pipe(
      filter((val) => val !== null && val !== undefined),
      switchMap((val) => this.saveEvent(val))
    );
  }

  private saveEvent(formEvent: FormEvent): Observable<any> {
    //Event
    const event = {
      type: formEvent.type,
      amount: +formEvent.amount,
      category: +formEvent.category,
      date: this.getFormattedCurrentDate(),
      description: formEvent.description,
      userId: 2,
      //userId: this.user.id
    };

    return this.http
      .post('/events', event)
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
