import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  baseUri='http://localhost:3000/user';

  constructor(private http: HttpClient,
    private roleService: RoleService) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.baseUri}/login`,{username,password})
    .pipe(map(result => {
      console.log(result);
      const { role } = jwt_decode(result) as any;
       Preferences.set({ key: 'role', value: role});
       Preferences.set({ key: 'token', value: result});
       this.roleService.setRole();
      return role as string;
    }));
  }
}
