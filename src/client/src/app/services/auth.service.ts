import { Injectable } from '@angular/core';
import { LoginResponse } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static STORAGE_KEYS = {
    AUTHORIZED_KEY: 'isAuthorized',
    LOGIN_NAME_KEY: 'loginName'
  };

  constructor() { }

  setUser(res: LoginResponse) {
    localStorage.setItem(AuthService.STORAGE_KEYS.AUTHORIZED_KEY, res.isAuthorized.toString());
    localStorage.setItem(AuthService.STORAGE_KEYS.LOGIN_NAME_KEY, res.loginName);
  }

  getUserName() {
    return localStorage.getItem(AuthService.STORAGE_KEYS.LOGIN_NAME_KEY);
  }

  isAuthorized(): boolean {
    return localStorage.getItem(AuthService.STORAGE_KEYS.AUTHORIZED_KEY) == 'true';
  }
}
