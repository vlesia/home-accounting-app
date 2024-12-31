import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private http = inject(HttpClient);

  public deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`/categories/${categoryId}`).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Unable to delete category. Please try again later.')
        );
      })
    );
  }
}
