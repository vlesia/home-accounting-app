import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUser(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
