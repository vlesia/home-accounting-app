import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { LoginForm, RegistrationForm } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  private httpClient = inject(HttpClient);

  loginUser(formData: LoginForm): Observable<User> {
    return this.findUserByEmail(formData.email).pipe(
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('This user does not exist'));
        }
        if (user.password !== formData.password) {
          return throwError(() => new Error('Password is not correct'));
        }
        return of(user);
      })
    );
  }

  registerUserIfNotExists(formData: RegistrationForm): Observable<User> {
    return this.findUserByEmail(formData.email).pipe(
      switchMap((userExists) =>
        userExists
          ? throwError(
              () => new Error('User with this email is already registered')
            )
          : this.registerUser(formData)
      )
    );
  }

  private registerUser(formData: RegistrationForm): Observable<User> {
    const newUser: Omit<User, 'id'> = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
    };

    return this.httpClient.post<User>(this.apiUrl, newUser);
  }

  private findUserByEmail(email: string): Observable<User | undefined> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Something went wrong. Please try again later.')
        );
      }),
      map(users => users.find(user => user.email === email)),
    );
  }
}
