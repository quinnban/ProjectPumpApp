import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs';
import { RoleService } from './role.service';
import { CurrentUserService } from './currentUser.service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  baseUri='http://localhost:3000/auth';

  constructor(private http: HttpClient,private roleService: RoleService, private currentUserService: CurrentUserService) { }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUri}`,{email,password}, {responseType: 'text'})
    .pipe(map(result => {
      const  token  = jwt_decode(result) as any;
       Preferences.set({ key: 'role', value: token.payload.role});
       Preferences.set({ key: 'profileId', value: token.payload.profileId});
       Preferences.set({ key: 'token', value: result});
        this.currentUserService.setUserId();
        this.roleService.setRole();
      return {role: token.payload.role, profileId: token.payload.profileId};
    }));
  }
}
