import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { RegistrationForm } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  private httpClient = inject(HttpClient);

  registerUserIfNotExists(formData: RegistrationForm): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users.some((user) => user.email === formData.email)),
      switchMap((userExists) =>
        userExists
          ? throwError(
              () => new Error('User with this email is already registered')
            )
          : this.registerUser(formData)
      )
    );
  }

  registerUser(formData: RegistrationForm): Observable<User> {
    const newUser: Omit<User, 'id'> = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
    };

    return this.httpClient.post<User>(this.apiUrl, newUser);
  }

  private getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Something went wrong. Please try again later.')
        );
      })
    );
  }
}
