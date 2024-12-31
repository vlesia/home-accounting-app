import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { FormCategory } from '../models/record.model';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Category } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  public get user(): User | null {
    return this.userService.getUser();
  }

  public saveCategory(formCategory: FormCategory): Observable<Category> {
    const category = {
      name: formCategory.name,
      capacity: +formCategory.capacity,
      userId: this.user!.id,
    };
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
