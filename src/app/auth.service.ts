import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:16956/auth';

  constructor(private http: HttpClient) { }

  register(user:User) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  login(user:User) {
    return this.http.post(this.baseUrl + 'login', user);
  }
}
