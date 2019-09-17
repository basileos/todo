import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  login(body) {
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  logout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  getTasks() {
    return this.http.get(`${this.baseUrl}/tasks`);
  }

  getTask(id) {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }

  createTask(body) {
    return this.http.post(`${this.baseUrl}/tasks`, body);
  }

  updateTask(body) {
    return this.http.put(`${this.baseUrl}/tasks/${body.id}`, body);
  }

  deleteTask(id) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }
}

export interface LoginResponse {
  loginName: string,
  isAuthorized: boolean
}

export interface TasksListResponse {
  items: [],
  total: number
}
