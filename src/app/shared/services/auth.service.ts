import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  baseUri='http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post(`${this.baseUri}/login`,{username,password});
  }
}
